const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const router = require("express").Router();
const { jwtSecret } = require("../../config/secret");
const Friends = require("./friendModel");
const authMW = require("../middleware/authMW");
const checkRole = require("../middleware/checkRole");
const checkID = require("../middleware/checkID");
const checkFriend = require("../middleware/checkFriend");
const { isValidFriend } = require("../middleware/validEntities");

function generateToken(friend) {
  const payload = {
    id: friend.id,
    username: friend.username,
    role: friend.role,
  };
  const options = {
    expiresIn: "7d",
  };
  return jwt.sign(payload, jwtSecret, options);
}

// ROUTES TO REGISTER AND LOGIN
router.post("/register", (req, res, next) => {
  if (isValidFriend(req.body)) {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);
    const password = hash;
    const username = req.body.username;
    Friends.add({ ...req.body, password: password })
      .then(() => {
        Friends.findBy({ username })
          .first()
          .then((friend) => {
            if (friend && password === friend.password) {
              const token = generateToken(friend);
              res.status(200).json({
                message: `Welcome, ${friend.username}.`,
                id: friend.id,
                name: friend.friend_name,
                username: friend.username,
                token,
              });
            } else if (
              friend &&
              bcrypt.compareSync(password, friend.password)
            ) {
              const token = generateToken(friend);
              res.status(200).json({
                message: `Welcome, ${friend.username}.`,
                id: friend.id,
                name: friend.friend_name,
                username: friend.username,
                token,
              });
            } else {
              res.status(401).json({ message: "Invalid credentials." });
            }
          })
          .catch((error) => {
            res.status(500).send(error);
          });
      })
      .catch((error) => {
        res.status(500).json({
          errorMessage: error.message,
          error: "Could not add the friend to partydox.",
          error,
        });
      });
  } else {
    next(new Error("Invalid Friend"));
  }
});

router.post("/login", (req, res) => {
  let { username, password } = req.body;
  Friends.findBy({ username })
    .first()
    .then((friend) => {
      if (friend && password === friend.password) {
        const token = generateToken(friend);
        res.status(200).json({
          message: `Welcome, ${friend.username}.`,
          id: friend.id,
          name: friend.friend_name,
          username: friend.username,
          token,
        });
      } else if (friend && bcrypt.compareSync(password, friend.password)) {
        const token = generateToken(friend);
        res.status(200).json({
          message: `Welcome, ${friend.username}.`,
          id: friend.id,
          name: friend.friend_name,
          username: friend.username,
          token,
        });
      } else {
        res.status(401).json({ message: "Invalid credentials." });
      }
    })
    .catch((error) => {
      res.status(500).send(error);
    });
});

// ROUTES FOR LOGGED NORMAL USERS
router.get("/user/:id", authMW, checkID, checkFriend, (req, res, next) => {
  Friends.FindById(req.params.id)
    .then((foundFriend) => res.status(200).json(foundFriend))
    .catch((err) => {
      res.status(500).json({ error: "didn't find friend in database" });
    });
});

router.put("/user/:id", authMW, checkID, checkFriend, (req, res, next) => {
  Friends.update(req.params.id, req.body)
    .then((friends) => {
      res.status(200).json({ id: friends[0].id, updated: true });
    })
    .catch((err) => {
      res.status(500).json({ error: "error updating friend", err });
    });
});

router.delete("/user/:id", authMW, checkID, checkFriend, (req, res) => {
  Friends.delete(req.params.id)
    .then((deleted) => {
      if (deleted === 0) {
        res.status(400).json({
          message: "not deleted, friend with specified id doesn't exist.",
        });
      } else {
        res.status(200).json({ deleted: true });
      }
    })

    .catch((err) => {
      res.status(500).json({ error: "error deleting friend from DB", err });
    });
});

// ROUTES FOR LOGGED IN ADMIN
router.get("/", authMW, checkRole("admin"), (req, res) => {
  const { username, friend_name, friend_email, friend_phone } = req.query;
  Friends.getAll({ username, friend_name, friend_email, friend_phone }).then(
    (friends) => {
      res.json(friends);
    }
  );
});

router.get("/:id", authMW, checkID, checkRole("admin"), (req, res, next) => {
  Friends.FindById(req.params.id)
    .then((foundFriend) => res.status(200).json(foundFriend))
    .catch((err) => {
      res.status(500).json({ error: "didn't find friend in database" });
    });
});

router.put("/:id", authMW, checkID, checkRole("admin"), (req, res, next) => {
  Friends.update(req.params.id, req.body)
    .then((friends) => {
      res.status(200).json({ id: friends[0].id, updated: true });
    })
    .catch((err) => {
      res.status(500).json({ error: "error updating friend" });
    });
});

router.delete("/:id", authMW, checkID, checkRole("admin"), (req, res) => {
  Friends.delete(req.params.id)
    .then((deleted) => {
      if (deleted === 0) {
        res.status(400).json({
          message: "not deleted, friend with specified id doesn't exist.",
        });
      } else {
        res.status(200).json({ deleted: true });
      }
    })

    .catch((err) => {
      res.status(500).json({ error: "error deleting friend from DB", err });
    });
});

module.exports = router;
