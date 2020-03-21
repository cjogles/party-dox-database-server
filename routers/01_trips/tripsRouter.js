const router = require("express").Router();
const Trip = require("./tripsModel");
const authMW = require("../auth/authMW");

router.get("/:id", authMW, (req, res) => {
  Trip.getAllFriendTrips(req.params.id).then(trips => {
    res.json(trips);
  });
});

module.exports = router;
