const router = require("express").Router();
const Trip = require("./tripsModel");
const authMW = require("../auth/authMW");

router.get("/", (req, res) => {
  Trip.getAllTrips()
    .then(trips => res.status(200).json(trips))
    .catch(error =>
      res.status(500).json({ error: "Error retrieving trips", error })
    );
});
router.get("/:id", authMW, (req, res) => {
  Trip.getFriendTrips(req.params.id)
    .then(trips => res.status(200).json(trips))
    .catch(error =>
      res.status(500).json({ error: "Error getting friends trips!", error })
    );
});

router.post("/", authMW, (req, res) => {
  Trip.addTrip(req.body)
    .then(addedTrip => res.status(201).json(addedTrip))
    .catch(error =>
      res
        .status(500)
        .json({ error: "Error adding Trip to Friends Account!", error })
    );
});

module.exports = router;
