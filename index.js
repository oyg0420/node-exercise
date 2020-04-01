const express = require("express");
const morgan = require("morgan");
const app = express();
const bodyparser = require("body-parser");
const user = require("./api/user");
const config = require("./config");

app.set("jwt-secrete", config.secrete);

if (process.env.NODE_ENV !== "test") {
  app.use(morgan("dev"));
}

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));

app.use("/", user);

module.exports = app;
