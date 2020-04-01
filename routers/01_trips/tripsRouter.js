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
// front end client is going to request a certain friends trips
// at that point my api will acertain if that friends id, is the
// the same id as the the friend who logged in. Other wise
// api will throw a 400 error saying its forbidden
router.get("/:id", authMW, checkRole("admin"), (req, res) => {
  Trip.getFriendTrips(req.params.id)
    .then(trips => res.status(200).json(trips))
    .catch(error =>
      res.status(500).json({ error: "Error getting friends trips!", error })
    );
});

module.exports = router;
