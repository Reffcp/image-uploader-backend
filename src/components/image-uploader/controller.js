const s3 = require("../../data/awsS3Instance");
const uuid = require("uuid").v4;
const response = require("../../network/response");
const model = require("./model");
const pool = require("../../data/connection");

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

  s3.upload(params, async (error, data) => {
    if (error) {
      console.error("Error uploading file:", error);
      response.error(res, "Error al subir la imagen", 500);
    }
    const dataToSave = model.DATA_TO_SAVE;
    dataToSave.imagen_url = data.Location;
    dataToSave.imagen_meta_s3 = JSON.stringify(data);
    dataToSave.imagen_tamanio = file.size;
    dataToSave.ip_origen = req.ip;

    const sqlInsert = `INSERT INTO ${model.NOMBRE_TABLA} SET ?`;

    try {
      await pool.query(sqlInsert, dataToSave);
      const sqlSelect = `SELECT * FROM ${model.NOMBRE_TABLA} 
      WHERE ${model.COLUMNAS.imagen_url} = ?`;
      const rows = await pool.query(sqlSelect, [data.Location]);
      if (rows.length === 0) {
        response.error(
          res,
          "Error al consultar la imagen durante el guardado",
          500
        );
      } else {
        delete rows[0][model.COLUMNAS.imagen_meta_s3];
        response.success(res, rows[0], "Imagen cargada correctamente", 201);
      }
    } catch (error) {
      console.error("Error al guardar la imagen en la base de datos", error);
      response.error(res, "Error al guardar la imagen", 500);
    }
  });
};

module.exports = {
  uploadImage,
};
