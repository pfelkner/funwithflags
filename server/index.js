const User = require("./db.js");

const express = require("express");
const app = express();
const cors = require("cors");

app.use(cors());
app.use(express.json());

app.listen(8081, () => {
  console.log("Server is running on port 8081");
});

User.sequelize.sync().then(() => {
  app.get("/", async (req, res) => {
    const ado = await User.create({
      username: "Paul",
      password: "Cee",
    });
    const users = await User.findAll();
    res.send(users);
  });

  app.post("/", async (req, res) => {
    const user = User.findOne({ where: { username: req.body.email } }).then(
      async (user) => {
        if (user) {
          throw new Error("User already exists");
        } else {
          const newUser = await User.create({
            username: req.body.email,
            password: req.body.password,
          });
          return newUser;
        }
      }
    );

    res.send(user);
  });
});
