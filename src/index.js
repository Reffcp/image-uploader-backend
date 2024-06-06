require("dotenv").config();
const express = require("express");
const errors = require("./network/errors");
const router = require("./network/routes");
const cors = require("cors");

const app = express();
app.use(cors());
router(app);
app.use(errors);
app.use(express.urlencoded({ extended: false }));

app.listen(process.env.API_PORT, process.env.API_HOST, () => {
  console.log("Server alive on port: " + process.env.API_PORT);
});

module.exports = app;
 