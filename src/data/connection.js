const mysql = require("mysql2");
const { promisify } = require("util");

const dbconf = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
};

const pool = mysql.createPool(dbconf);

async function getConnectionWithRetries(retries = 5, backoff = 500) {
  for (let i = 0; i < retries; i++) {
    try {
      const connection = await new Promise((resolve, reject) => {
        pool.getConnection((err, connection) => {
          if (err) {
            if (err.code === "ECONNRESET") {
              console.error(
                `ECONNRESET error: retrying connection attempt ${i + 1}`
              );
              reject(err);
            } else {
              reject(err);
            }
          } else {
            resolve(connection);
          }
        });
      });
      return connection;
    } catch (err) {
      if (i === retries - 1) {
        throw err;
      }
      await new Promise((res) => setTimeout(res, backoff));
      backoff *= 2; // Exponential backoff
    }
  }
}

async function initializePool() {
  try {
    const connection = await getConnectionWithRetries();
    if (connection) {
      connection.release();
      console.log("Conexión exitosa a la base de datos.");
    }
  } catch (err) {
    console.error(
      "Error al conectar a la base de datos después de varios intentos: " + err
    );
  }
}

initializePool();

pool.query = promisify(pool.query);

module.exports = pool;
