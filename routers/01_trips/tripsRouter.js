const router = require("express").Router();
const Trip = require("./tripsModel");
const authMW = require("../middleware/authMW");
const checkRole = require("../middleware/checkRole");
const checkFriend = require("../middleware/checkFriend");

// ROUTES FOR LOGGED IN NORMAL USERS
router.get("/user/:id", authMW, checkFriend, (req, res) => {
  Trip.getFriendTrips(req.params.id)
    .then((trips) => res.status(200).json(trips))
    .catch((error) =>
      res.status(500).json({ error: "Error getting friends trips!", error })
    );
});

router.get("/user/:id/trip/:tripId", authMW, checkFriend, (req, res) => {
  Trip.getTrip(req.params.tripId)
    .then((trip) => {
      res.status(200).json(trip);
    })
    .catch((err) => {
      res.status(500).json({
        error: "couldn't retrieve trip with specified id in params.",
        err,
      });
    });
});

router.post("/user/:id", authMW, checkFriend, (req, res) => {
  Trip.addTrip(req.params.id, req.body)
    .then((added) => {
      res.status(201).json({ message: "added trip to friend account", added });
    })
    .catch((err) => {
      res
        .status(500)
        .json({ error: "Error adding a trip to friends account.", err });
    });
});

// add a trip to friends dashboard
router.post("/user/:id/userJoin/:tripId", authMW, checkFriend, (req, res) => {
  Trip.addJoin(req.params.tripId, req.body)
    .then((added) => {
      res.status(200).json(added);
    })
    .catch((err) => {
      res.status(500).json({
        error:
          "could not give specified friend access to specified trip via request parameters (trip id) and request body (friend username)",
        err,
      });
    });
});

router.put("/user/:id/trip/:tripId", authMW, checkFriend, (req, res) => {
  Trip.updateTrip(req.params.tripId, req.body)
    .then((updatedTrip) => {
      res.status(200).json(updatedTrip);
    })
    .catch((err) => {
      res.status(500).json({
        error: "problem updating trip with specified friend id and trip id",
        err,
      });
    });
});

router.delete("/user/:id/trip/:tripId", authMW, checkFriend, (req, res) => {
  Trip.deleteTrip(req.params.tripId)
    .then((deleted) => {
      if (deleted === 0) {
        res.status(400).json({
          message:
            "Nothing Deleted. Likely because the trip you specified doesn't exist.",
        });
      } else {
        res
          .status(200)
          .json({ message: "number of data entries deleted", deleted });
      }
    })
    .catch((err) => {
      res
        .status(500)
        .json({ error: "Error deleting a trip from friends account.", err });
    });
});

router.get("/:id/tripFriends/:tripId", authMW, checkFriend, (req, res) => {
  Trip.getFriendList(req.params.tripId)
    .then((friendIdList) => {
      res.status(200).json(friendIdList);
    })
    .catch((err) => {
      res
        .status(500)
        .json({
          error: "Error getting List of Friends going on specified trip",
        });
    });
});

// ROUTES FOR LOGGED IN ADMIN
router.get("/join", authMW, checkRole("admin"), (req, res) => {
  Trip.getJoin()
    .then((retrieved) => {
      res.status(200).json(retrieved);
    })
    .catch((err) => {
      res
        .status(500)
        .json({ error: "Error getting Join Table for Friends and Trips" });
    });
});

// add trip to friends list of trips
router.post("/userJoin/:tripId", authMW, checkRole("admin"), (req, res) => {
  Trip.addJoin(req.params.tripId, req.body)
    .then((added) => {
      res.status(200).json(added);
    })
    .catch((err) => {
      res.status(500).json({
        error:
          "could not give specified friend access to specified trip via request parameters (trip id) and request body (friend username)",
        err,
      });
    });
});

router.get("/", authMW, checkRole("admin"), (req, res) => {
  Trip.getAllTrips()
    .then((trips) => res.status(200).json(trips))
    .catch((error) =>
      res.status(500).json({ error: "Error retrieving trips", error })
    );
});

router.get("/:id", authMW, checkRole("admin"), (req, res) => {
  Trip.getFriendTrips(req.params.id)
    .then((trips) => res.status(200).json(trips))
    .catch((error) =>
      res.status(500).json({ error: "Error getting friends trips!", error })
    );
});

router.post("/:id", authMW, checkRole("admin"), (req, res) => {
  Trip.addTrip(req.params.id, req.body)
    .then((added) => {
      res.status(201).json({ message: "added trip to friend account", added });
    })
    .catch((err) => {
      res
        .status(500)
        .json({ error: "Error adding a trip to friends account.", err });
    });
});

router.put("/user/:tripId", authMW, checkRole("admin"), (req, res) => {
  Trip.updateTrip(req.params.tripId, req.body)
    .then((updatedTrip) => {
      res.status(200).json(updatedTrip);
    })
    .catch((err) => {
      res.status(500).json({
        error: "problem updating trip with specified friend id and trip id",
        err,
      });
    });
});

router.delete("/user/:tripId", authMW, checkRole("admin"), (req, res) => {
  Trip.deleteTrip(req.params.tripId)
    .then((deleted) => {
      if (deleted === 0) {
        res.status(400).json({
          message:
            "Nothing Deleted. Likely because the trip you specified doesn't exist.",
        });
      } else {
        res
          .status(200)
          .json({ message: "number of data entries deleted", deleted });
      }
    })
    .catch((err) => {
      res
        .status(500)
        .json({ error: "Error deleting a trip from friends account.", err });
    });
});

module.exports = router;
