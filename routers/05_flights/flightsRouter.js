const router = require("express").Router();
const Flight = require("./flightsModel");
const authMW = require("../middleware/authMW");
const checkRole = require("../middleware/checkRole");
const checkFriend = require("../middleware/checkFriend");

//LOGGED IN USER ROUTES
router.get("/user/:id/flightTrip/:tripId", authMW, checkFriend, (req, res) => {
  Flight.getFlightsByTripId(req.params.tripId)
    .then((flight) => {
      res.status(200).json(flight);
    })
    .catch((err) => {
      res.status(500).json({
        error: "couldn't retrieve flight with specified id in params.",
        err,
      });
    });
});

router.get("/user/:id/flight/:flightId", authMW, checkFriend, (req, res) => {
  Flight.getFlightsById(req.params.flightId)
    .then((flight) => {
      res.status(200).json(flight);
    })
    .catch((err) => {
      res.status(500).json({
        error: "couldn't retrieve flight with specified id in params.",
        err,
      });
    });
});

router.post("/user/:id/flightTrip/:tripId", authMW, checkFriend, (req, res) => {
  let flight = req.body;
  flight.trip_id = req.params.tripId;
  Flight.addFlight(flight)
    .then((added) => {
      res.status(201).json(added);
    })
    .catch((err) => {
      res.status(500).json({ error: "error adding flight to trip", err });
    });
});

router.put("/user/:id/flight/:flightId", authMW, checkFriend, (req, res) => {
  Flight.updateFlight(req.params.flightId, req.body)
    .then((updated) => {
      res.status(201).json(updated);
    })
    .catch((err) => {
      res.status(500).json({
        error: "error updating flight by flight id",
        err,
      });
    });
});

router.delete("/user/:id/flight/:flightId", authMW, checkFriend, (req, res) => {
  Flight.deleteFlight(req.params.flightId)
    .then((deleted) => {
      if (deleted === 0) {
        res.status(400).json({
          error:
            "nothing deleted, mostly likely because this flight doesn't exist",
        });
      } else {
        res
          .status(200)
          .json({ success: "Deleted this number of entries.", deleted });
      }
    })
    .catch((err) => {
      res.status(500).json({ error: "error deleting flight from trip" });
    });
});

//ADMIN ROUTES
router.get("/", authMW, checkRole("admin"), (req, res) => {
  Flight.getFlights()
    .then((flights) => {
      res.status(200).json(flights);
    })
    .catch((err) => {
      res.status(500).json({ error: "error getting flights" });
    });
});

router.get("/:id", authMW, checkRole("admin"), (req, res) => {
  Flight.getFlightsById(req.params.id)
    .then((flight) => {
      res.status(200).json(flight);
    })
    .catch((err) => {
      res.status(500).json({
        error: "couldn't retrieve flights with specified id in params.",
        err,
      });
    });
});

router.post("/flightTrip/:tripId", authMW, checkRole("admin"), (req, res) => {
  let flight = req.body;
  flight.trip_id = req.params.tripId;
  Flight.addFlight(flight)
    .then((added) => {
      res.status(201).json(added);
    })
    .catch((err) => {
      res.status(500).json({ error: "error adding flight to trip", err });
    });
});

router.put("/:flightId", authMW, checkRole("admin"), (req, res) => {
  Flight.updateFlight(req.params.flightId, req.body)
    .then((added) => {
      res.status(201).json(added);
    })
    .catch((err) => {
      res.status(500).json({
        error: "error updating flight by flight id",
        err,
      });
    });
});

router.delete("/:flightId", authMW, checkRole("admin"), (req, res) => {
  Flight.deleteFlight(req.params.flightId)
    .then((deleted) => {
      if (deleted === 0) {
        res.status(400).json({
          error:
            "nothing deleted, mostly likely because this flight doesn't exist",
        });
      } else {
        res
          .status(200)
          .json({ success: "Deleted this number of entries.", deleted });
      }
    })
    .catch((err) => {
      res.status(500).json({ error: "error deleting flight from trip" });
    });
});

module.exports = router;
