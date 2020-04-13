const router = require("express").Router();
const Parking = require("./parkingModel");
const authMW = require("../middleware/authMW");
const checkRole = require("../middleware/checkRole");
const checkFriend = require("../middleware/checkFriend");

//LOGGED IN USER ROUTES
router.get("/user/:id/parkingTrip/:tripId", authMW, checkFriend, (req, res) => {
  Parking.getParkingByTripId(req.params.tripId)
    .then((parking) => {
      res.status(200).json(parking);
    })
    .catch((err) => {
      res.status(500).json({
        error:
          "couldn't retrieve parking lot info with specified id in params.",
        err,
      });
    });
});

router.get("/user/:id/parking/:parkingId", authMW, checkFriend, (req, res) => {
  Parking.getParkingById(req.params.parkingId)
    .then((parking) => {
      res.status(200).json(parking);
    })
    .catch((err) => {
      res.status(500).json({
        error:
          "couldn't retrieve parking lot info with specified id in params.",
        err,
      });
    });
});
router.post(
  "/user/:id/parkingTrip/:tripId/parkingActivity/:activityId",
  authMW,
  checkFriend,
  (req, res) => {
    let parking = req.body;
    parking.trip_id = req.params.tripId;
    parking.activity_id = req.params.activityId;
    Parking.addParking(parking)
      .then((added) => {
        res.status(201).json(added);
      })
      .catch((err) => {
        res
          .status(500)
          .json({ error: "error adding parking lot to trip", err });
      });
  }
);

router.put("/user/:id/parking/:parkingId", authMW, checkFriend, (req, res) => {
  Parking.updateParking(req.params.parkingId, req.body)
    .then((updated) => {
      res.status(201).json(updated);
    })
    .catch((err) => {
      res.status(500).json({
        error: "error updating parking lot by parking lot id",
        err,
      });
    });
});

router.delete(
  "/user/:id/parking/:parkingId",
  authMW,
  checkFriend,
  (req, res) => {
    Parking.deleteParking(req.params.parkingId)
      .then((deleted) => {
        if (deleted === 0) {
          res.status(400).json({
            error:
              "nothing deleted, mostly likely because this parking lot doesn't exist",
          });
        } else {
          res
            .status(200)
            .json({ success: "Deleted this number of entries.", deleted });
        }
      })
      .catch((err) => {
        res.status(500).json({ error: "error deleting parking lot from trip" });
      });
  }
);

//ADMIN ROUTES
router.get("/", authMW, checkRole("admin"), (req, res) => {
  Parking.getParking()
    .then((parking) => {
      res.status(200).json(parking);
    })
    .catch((err) => {
      res.status(500).json({ error: "error getting parking lots" });
    });
});

router.get("/:id", authMW, checkRole("admin"), (req, res) => {
  Parking.getParkingById(req.params.id)
    .then((parking) => {
      res.status(200).json(parking);
    })
    .catch((err) => {
      res.status(500).json({
        error: "couldn't retrieve parking with specified id in params.",
        err,
      });
    });
});

router.post(
  "/parkingTrip/:tripId/parkingActivity/:activityId",
  authMW,
  checkRole("admin"),
  (req, res) => {
    let parking = req.body;
    parking.trip_id = req.params.tripId;
    parking.activity_id = req.params.activityId;
    Parking.addParking(parking)
      .then((added) => {
        res.status(201).json(added);
      })
      .catch((err) => {
        res
          .status(500)
          .json({ error: "error adding parking lot info to trip", err });
      });
  }
);

router.put("/:parkingId", authMW, checkRole("admin"), (req, res) => {
  Parking.updateParking(req.params.parkingId, req.body)
    .then((added) => {
      res.status(201).json(added);
    })
    .catch((err) => {
      res.status(500).json({
        error: "error updating parking lot by parking lot id",
        err,
      });
    });
});

router.delete("/:parkingId", authMW, checkRole("admin"), (req, res) => {
  Parking.deleteParking(req.params.parkingId)
    .then((deleted) => {
      if (deleted === 0) {
        res.status(400).json({
          error:
            "nothing deleted, mostly likely because this parking lot doesn't exist",
        });
      } else {
        res
          .status(200)
          .json({ success: "Deleted this number of entries.", deleted });
      }
    })
    .catch((err) => {
      res.status(500).json({ error: "error deleting parking lot from trip" });
    });
});

module.exports = router;
