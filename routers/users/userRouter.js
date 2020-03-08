const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const router = require("express").Router();
const { jwtSecret } = require("../../config/secret");
const Users = require("./userModel");

function generateToken(user) {
  const payload = {
    username: user.username
  };
  const options = {
    expiresIn: "7d"
  };
  return jwt.sign(payload, jwtSecret, options);
}

router.post("/register", (req, res) => {
  let { username, password } = req.body;
  const salt = bcrypt.genSalt(10);
  const hash = bcrypt.hashSync(password, salt);
  password = hash;
  Users.add({ username: username, password: password })
    .then(saved => {
      res.status(201).json(saved);
    })
    .catch(error => {
      res.status(500).json({ message: "Could not add the user.", error });
    });
  Users.findBy({ username })
    .first()
    .then(user => {
      if (user && password === user.password) {
        const token = generateToken(user);
        res
          .status(200)
          .json({ message: `Welcome, ${user.username}.`, token, user });
      } else if (user && bcrypt.compareSync(password, user.password)) {
        const token = generateToken(user);
        res
          .status(200)
          .json({ message: `Welcome, ${user.username}.`, token, user });
      } else {
        res.status(401).json({ message: "Invalid credentials." });
      }
    })
    .catch(error => {
      res.status(500).send(error);
    });
});

router.post("/login", (req, res) => {
  let { username, password } = req.body;
  Users.findBy({ username })
    .first()
    .then(user => {
      if (user && password === user.password) {
        const token = generateToken(user);
        res
          .status(200)
          .json({ message: `Welcome, ${user.username}.`, token, user });
      } else if (user && bcrypt.compareSync(password, user.password)) {
        const token = generateToken(user);
        res
          .status(200)
          .json({ message: `Welcome, ${user.username}.`, token, user });
      } else {
        res.status(401).json({ message: "Invalid credentials." });
      }
    })
    .catch(error => {
      res.status(500).send(error);
    });
});

module.exports = router;
