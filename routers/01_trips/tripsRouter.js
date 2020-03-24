const router = require("express").Router();
const Trip = require("./tripsModel");
const authMW = require("../middleware/authMW");
const checkRole = require("../middleware/checkRole");
const { isValidTrip } = require("../middleware/validEntities");

router.get("/", authMW, checkRole("admin"), (req, res) => {
  Trip.getAllTrips()
    .then(trips => res.status(200).json(trips))
    .catch(error =>
      res.status(500).json({ error: "Error retrieving trips", error })
    );
});

// req.params.id === friendId
router.get("/:id", authMW, (req, res) => {
  Trip.getFriendTrips(req.params.id)
    .then(trips => res.status(200).json(trips))
    .catch(error =>
      res.status(500).json({ error: "Error getting friends trips!", error })
    );
});

// req.params.id === friendId
router.post("/:id", authMW, (req, res) => {
  if (isValidTrip(req.body)) {
    Trip.addTrip(req.body)
      .then(addedTrip => res.status(201).json(addedTrip))
      .catch(error =>
        res
          .status(500)
          .json({ error: "Error adding Trip to Friends Account!", error })
      );
  } else {
    next(new Error("Invalid Trip, Needs Trip Name At Least."));
  }
});

module.exports = router;
