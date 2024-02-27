// db.js
const { Sequelize, DataTypes } = require("sequelize");
const path = require("path");

const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: path.resolve(__dirname, "database.sqlite"), // adjust the path and filename as needed
});

const User = sequelize.define("User", {
  username: DataTypes.STRING,
  password: DataTypes.STRING,
});

// const ado = await User.create({
//   username: "Ado",
//   password: "Cee",
// });

module.exports = User;
