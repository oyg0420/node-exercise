const express = require("express");
const morgan = require("morgan");
const app = express();
const bodyparser = require("body-parser");

const user = require("./api/user");

app.use(morgan("dev"));

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));

app.use("/", user);

module.exports = app;
