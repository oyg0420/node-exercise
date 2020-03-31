const Sequelize = require("sequelize");

const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "./db.sqlite",
  logging: false
});

const User = sequelize.define("User", {
  email: { type: Sequelize.STRING, unique: true, allowNull: false },
  password: { type: Sequelize.STRING, allowNull: false },
  URL: { type: Sequelize.STRING }
});

module.exports = { Sequelize, sequelize, User };
