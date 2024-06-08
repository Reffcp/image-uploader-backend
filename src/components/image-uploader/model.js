const imgenUploadData = {
  NOMBRE_TABLA: "imagenes",
  COLUMNAS: {
    imagen_id: "imagen_id",
    imagen_url: "imagen_url",
    imagen_meta_s3: "imagen_meta_s3",
    fecha_hora_creacion: "fecha_hora_creacion",
    fecha_hora_borrar: "fecha_hora_borrar",
    imagen_tamanio: "imagen_tamanio",
    ip_origen: "ip_origen",
    registro_activo: "registro_activo",
  },
  DATA_TO_SAVE: {
    imagen_url: "",
    imagen_meta_s3: "",
    fecha_hora_creacion: new Date(),
    imagen_tamanio: 0,
    ip_origen: "0.0.0.0",
    registro_activo: true,
  },
};

module.exports = imgenUploadData;
