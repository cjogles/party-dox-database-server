const router = require("express").Router();
const Trip = require("./tripsModel");
const authMW = require("../middleware/authMW");
const checkRole = require("../middleware/checkRole");
const checkFriend = require("../middleware/checkFriend");

// ROUTES FOR LOGGED IN NORMAL USERS
router.get("/user/:id", authMW, checkFriend, (req, res) => {
  Trip.getFriendTrips(req.params.id)
    .then(trips => res.status(200).json(trips))
    .catch(error =>
      res.status(500).json({ error: "Error getting friends trips!", error })
    );
});

router.post("/user/:id", authMW, checkFriend, (req, res) => {
  let newTrip = req.body;
  let friend_id = req.params.id;
  Trip.addTrip(friend_id, newTrip)
    .then(added => {
      res.status(201).json({ message: "added trip to friend account", added });
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: "Error adding a trip to friends account.", err });
    });
});

router.put("/user/:id/trip/:trip_id", authMW, checkFriend, (req, res) => {
  let newTrip = req.body;
  let friend_id = req.params.id;
  let trip_id = req.params.trip_id;
  // get trip and join table, and update
  Trip.getFriendTrips(friend_id)
    .then(friendTrips => {
      Trip.updateTrip(friend_id, trip_id, newTrip, friendTrips)
        .then(added => {
          res
            .status(201)
            .json({ message: "added trip to friend account", added });
        })
        .catch(err => {
          res
            .status(500)
            .json({ error: "Error adding a trip to friends account.", err });
        });
    })
    .catch();
});

router.delete("/user/:id/trip/:trip_id", authMW, checkFriend, (req, res) => {
  let newTrip = req.body;
  let friend_id = req.params.id;
  let trip_id = req.params.trip_id;
  Trip.deleteTrip(friend_id, newTrip, trip_id)
    .then(added => {
      res.status(201).json({ message: "added trip to friend account", added });
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: "Error adding a trip to friends account.", err });
    });
});

// ROUTES FOR LOGGED IN ADMIN
router.get("/", authMW, checkRole("admin"), (req, res) => {
  Trip.getAllTrips()
    .then(trips => res.status(200).json(trips))
    .catch(error =>
      res.status(500).json({ error: "Error retrieving trips", error })
    );
});

router.get("/:id", authMW, checkRole("admin"), (req, res) => {
  Trip.getFriendTrips(req.params.id)
    .then(trips => res.status(200).json(trips))
    .catch(error =>
      res.status(500).json({ error: "Error getting friends trips!", error })
    );
});

router.post("/:id", authMW, checkRole("admin"), (req, res) => {
  let newTrip = req.body;
  let friend_id = req.params.id;
  Trip.addTrip(friend_id, newTrip)
    .then(added => {
      res.status(201).json({ message: "added trip to friend account", added });
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: "Error adding a trip to friends account.", err });
    });
});

module.exports = router;
