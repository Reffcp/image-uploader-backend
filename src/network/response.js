exports.success = (res, data, message, status) => {
  let statusCode = status || 200
  let statusMessage = message || 'Acción realizada correctamente'

  res.status(status).send({
    error: false,
    status: statusCode,
    body: data,
    message: statusMessage,
  })
}

exports.error = (res, message, status) => {
  let statusCode = status || 500
  let messageFinal = message || 'Internal Server Error'

  res.status(statusCode).send({
    error: true,
    status: statusCode,
    body: [],
    message: messageFinal,
  })
}
