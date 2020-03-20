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

function validFriend(friend) {
  const hasUsername =
    typeof friend.username == "string" && friend.username.trim() != "";
  const hasPassword =
    typeof friend.password == "string" && friend.password.trim() != "";
  const hasFriend_name =
    typeof friend.friend_name == "string" && friend.friend_name.trim() != "";
  return hasUsername && hasPassword && hasFriend_name;
}

router.get("/", (req, res) => {
  Friends.getAll().then(friends => {
    res.json(friends);
  });
});

router.post("/register", (req, res, next) => {
  let friend = req.body;
  if (validFriend(friend)) {
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
  Friends.findBy(req.body)
    .first()
    .then(res => {
      console.log(res);
      res.status(200).json({ response: "response from login:", res });
    })
    .catch(err => {
      console.log(res);
      res
        .status(500)
        .json({ error: "response of the logged in friend failed", err });
    });
  // .then(friend => {
  //   // return friend in table of friends
  //   // if friend exists, and if friends password is equal to
  //   if (friend && password === friend.password) {
  //     const token = generateToken(friend);
  //     res
  //       .status(200)
  //       .json({ message: `Welcome, ${friend.username}.`, token, friend });
  //   } else if (user && bcrypt.compareSync(password, friend.password)) {
  //     const token = generateToken(friend);
  //     res
  //       .status(200)
  //       .json({ message: `Welcome, ${user.username}.`, token, friend });
  //   } else {
  //     res.status(401).json({ message: "Invalid credentials." });
  //   }
  // })
  // .catch(error => {
  //   res.status(500).send({ message: "Could not find friend", error });
  // });
});

router.delete("/:id", (req, res) => {
  Friends.delete(req.params.id).then(() => {
    res
      .status(200)
      .json({ deleted: true })
      .catch(err => {
        err.status(500).json({ error: "error deleting friend from DB", err });
      });
  });
});

module.exports = router;
