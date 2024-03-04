// db.js
const { Sequelize, DataTypes } = require("sequelize");
const path = require("path");

const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: path.resolve(__dirname, "database.sqlite"), // adjust the path and filename as needed
});

const testConnection = async () => {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};

const User = sequelize.define("User", {
  username: DataTypes.STRING,
  password: DataTypes.STRING,
  correctGuesses: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  incorrectGuesses: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  bestStreak: { type: DataTypes.INTEGER, allowNull: true },
});

(module.exports = User), sequelize, testConnection;
