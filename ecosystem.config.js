module.exports = {
  apps: [
    {
      name: "image-uploader-backend",
      script: "./index.js",
      env_development: {
        NODE_ENV: "development",
        API_PORT: process.env.API_PORT,
        DB_HOST: process.env.DB_HOST,
        DB_USER: process.env.DB_USER,
        DB_PASSWORD: process.env.DB_PASSWORD,
        DB_NAME: process.env.DB_NAME,
        AWS_ACCESS_KEY_ID: process.env.AWS_ACCESS_KEY_ID,
        AWS_SECRET_ACCESS_KEY: process.env.AWS_SECRET_ACCESS_KEY,
        AWS_BUCKET_NAME: process.env.AWS_BUCKET_NAME,
        WEB_SERVER_PRIVATE_KEY_PATH: process.env.WEB_SERVER_PRIVATE_KEY_PATH,
        WEB_SERVER_FULLCHAIN_CERT_PATH:
          process.env.WEB_SERVER_FULLCHAIN_CERT_PATH,
      },
      env_production: {
        NODE_ENV: "production",
        API_PORT: process.env.API_PORT,
        DB_HOST: process.env.DB_HOST,
        DB_USER: process.env.DB_USER,
        DB_PASSWORD: process.env.DB_PASSWORD,
        DB_NAME: process.env.DB_NAME,
        AWS_ACCESS_KEY_ID: process.env.AWS_ACCESS_KEY_ID,
        AWS_SECRET_ACCESS_KEY: process.env.AWS_SECRET_ACCESS_KEY,
        AWS_BUCKET_NAME: process.env.AWS_BUCKET_NAME,
        WEB_SERVER_PRIVATE_KEY_PATH: process.env.WEB_SERVER_PRIVATE_KEY_PATH,
        WEB_SERVER_FULLCHAIN_CERT_PATH:
          process.env.WEB_SERVER_FULLCHAIN_CERT_PATH,
      },
    },
  ],
};
