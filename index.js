const express = require("express");
const errors = require("./src/network/errors");
const router = require("./src/network/routes");
const cors = require("cors");
const https = require("https");
const fs = require("fs");

require("./config.js");

const app = express();
app.use(cors());
router(app);
app.use(errors);
app.use(express.urlencoded({ extended: false }));


if (process.env.ENVIROMENT === "development") {
  app.listen(process.env.API_PORT, process.env.API_HOST, () => {
    console.log(
      `Server is running on http://localhost:${process.env.API_PORT}`
    );
  });
} else {
  const options = {
    key: fs.readFileSync(process.env.WEB_SERVER_PRIVATE_KEY_PATH),
    cert: fs.readFileSync(process.env.WEB_SERVER_FULLCHAIN_CERT_PATH),
  };
  https
    .createServer(options, app)
    .listen(process.env.API_PORT, process.env.API_HOST, () => {
      console.log(
        `Server is running on https://${process.env.API_HOST}:${process.env.API_PORT}`
      );
    });
}

module.exports = app;
