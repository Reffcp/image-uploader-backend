const s3 = require("../../data/awsS3Instance");
const uuid = require("uuid").v4;
const response = require("../../network/response");

const uploadImage = async (req, res) => {
  const file = req.file;
  if (!file) {
    response.error(res, "No hay imagen que subir", 400);
  }

  const fileName = `${uuid()}_${file.originalname}`;
  const params = {
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: fileName,
    Body: file.buffer,
    ContentType: file.mimetype,
  };

  s3.upload(params, (error, data) => {
    if (error) {
      console.error("Error uploading file:", error);
      response.error(res, "Error al subir la imagen", 500);
    }
    const resData = {
      url: data.Location,
    };
    response.success(res, resData, "Imagen cargada correctamente", 201);
  });
};

module.exports = {
  uploadImage,
};
