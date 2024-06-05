import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import * as express from "express";
import * as multer from "multer";

admin.initializeApp();
const db = admin.database();
const storage = admin.storage();

const app = express();
const upload = multer({ storage: multer.memoryStorage() });

app.post("/upload", upload.single("image"), async (req, res) => {
  if (!req.file) {
    return res.status(400).send("No file uploaded.");
  }

  const bucket = storage.bucket();
  const fileName = `${Date.now()}_${req.file.originalname}`;
  const file = bucket.file(fileName);

  await file.save(req.file.buffer, {
    metadata: { contentType: req.file.mimetype },
  });

  const url = await file.getSignedUrl({
    action: "read",
    expires: "03-01-2500",
  });

  const metadata = {
    url: url[0],
    createdAt: Date.now(),
    deleteAt: Date.now() + 7 * 24 * 60 * 60 * 1000, // 1 semana
  };

  await db.ref("images").push(metadata);
  return res.status(200).send({ url: metadata.url });
});

exports.api = functions.https.onRequest(app);

const deleteOldImages = async () => {
  const now = Date.now();
  const snapshot = await db.ref("images")
    .orderByChild("deleteAt")
    .endAt(now)
    .once("value");
  const updates: { [key: string]: null } = {};

  snapshot.forEach((child) => {
    const data = child.val();
    const fileName = data.url.split("/").pop().split("?")[0];
    storage.bucket().file(fileName).delete();
    updates[child.key] = null;
  });

  await db.ref("images").update(updates);
};

exports.scheduledFunction = functions.pubsub
  .schedule("every 24 hours")
  .onRun(deleteOldImages);
