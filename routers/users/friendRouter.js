const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const router = require("express").Router();
const { jwtSecret } = require("../../config/secret");
const Friends = require("./friendModel");

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

  Friends.add({ username: username, password: password })
    .then(addedFriend => {
      res.status(201).json(addedFriend);
    })
    .catch(error => {
      res
        .status(500)
        .json({ message: "Could not add the friend to partydox.", error });
    });

  Friends.findBy({ username })
    .first()
    .then(friend => {
      if (friend && password === friend.password) {
        const token = generateToken(friend);
        res
          .status(200)
          .json({ message: `Welcome, ${friend.username}.`, token, friend });
      } else if (friend && bcrypt.compareSync(password, friend.password)) {
        const token = generateToken(friend);
        res
          .status(200)
          .json({ message: `Welcome, ${friend.username}.`, token, friend });
      } else {
        res.status(401).json({ message: "Invalid credentials." });
      }
    })
    .catch(error => {
      res.status(500).send({ message: "Could not find friend", error });
    });
});

router.post("/login", (req, res) => {
  let { username, password } = req.body;
  Friends.findBy({ username })
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
