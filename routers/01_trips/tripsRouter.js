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

router.post("/user/:id/trip/:tripId", authMW, checkFriend, (req, res) => {
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
