const imageUploaderNetwork = require("../components/image-uploader/network");
require("../../config.js");

const RUTAPRINCIPAL =
  (process.env.API_MAIN_ROUTE || "/api") + (process.env.API_VERSION || "/v1");

const routes = (app) => {
  app.use(`${RUTAPRINCIPAL}/image`, imageUploaderNetwork);
};

module.exports = routes;
