const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const router = require("express").Router();
const { jwtSecret } = require("../../config/secret");
const Friends = require("./friendModel");
const authMW = require("../auth/authMW");

function generateToken(user) {
  const payload = {
    username: user.username
  };
  const options = {
    expiresIn: "7d"
  };
  return jwt.sign(payload, jwtSecret, options);
}

function isValidFriend(friend) {
  const hasUsername =
    typeof friend.username == "string" && friend.username.trim() != "";
  const hasPassword =
    typeof friend.password == "string" && friend.password.trim() != "";
  const hasFriend_name =
    typeof friend.friend_name == "string" && friend.friend_name.trim() != "";
  return hasUsername && hasPassword && hasFriend_name;
}

function isValidId(req, res, next) {
  if (!isNaN(req.params.id)) return next();
  next(new Error("Invalid ID"));
}

router.get("/", (req, res) => {
  Friends.getAll().then(friends => {
    res.json(friends);
  });
});

router.post("/register", (req, res, next) => {
  let friend = req.body;
  if (isValidFriend(friend)) {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(friend.password, salt);
    password = hash;

    Friends.add(friend)
      .then(addedFriend => {
        res.status(201).json(addedFriend[0]);
      })
      .catch(error => {
        res
          .status(500)
          .json({ message: "Could not add the friend to partydox.", error });
      });
  } else {
    next(new Error("Invalid Friend"));
  }
});

router.post("/login", (req, res) => {
  let { username, password } = req.body;
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
      res.status(500).send(error);
    });
});

router.delete("/:id", isValidId, authMW, (req, res) => {
  Friends.delete(req.params.id).then(() => {
    res
      .status(200)
      .json({ deleted: true })
      .catch(err => {
        err.status(500).json({ error: "error deleting friend from DB", err });
      });
  });
});

router.put("/:id", isValidId, authMW, (req, res, next) => {
  if (isValidFriend(req.body)) {
    Friends.update(req.params.id, req.body).then(friends => {
      res.status(200).json(friends[0]);
    });
  } else {
    next(new Error("Invalid Friend"));
  }
});

module.exports = router;
