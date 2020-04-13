const router = require("express").Router();
const Activity = require("./activitiesModel");
const authMW = require("../middleware/authMW");
const checkRole = require("../middleware/checkRole");
const checkFriend = require("../middleware/checkFriend");

//LOGGED IN USER ROUTES
router.get(
  "/user/:id/activityTrip/:tripId",
  authMW,
  checkFriend,
  (req, res) => {
    Activity.getActivityByTrip(req.params.tripId)
      .then((activity) => {
        res.status(200).json(activity);
      })
      .catch((err) => {
        res.status(500).json({
          error: "couldn't retrieve activity with specified id in params.",
          err,
        });
      });
  }
);

router.get(
  "/user/:id/activity/:activityId",
  authMW,
  checkFriend,
  (req, res) => {
    Activity.getActivity(req.params.activityId)
      .then((activity) => {
        res.status(200).json(activity);
      })
      .catch((err) => {
        res.status(500).json({
          error: "couldn't retrieve activity with specified id in params.",
          err,
        });
      });
  }
);
router.post(
  "/user/:id/activityTrip/:tripId",
  authMW,
  checkFriend,
  (req, res) => {
    let activity = req.body;
    activity.trip_id = req.params.tripId;
    Activity.addActivity(activity)
      .then((added) => {
        res.status(201).json(added);
      })
      .catch((err) => {
        res.status(500).json({ error: "error adding activity to trip", err });
      });
  }
);

router.put(
  "/user/:id/activity/:activityId",
  authMW,
  checkFriend,
  (req, res) => {
    Activity.updateActivity(req.params.activityId, req.body)
      .then((updated) => {
        res.status(201).json(updated);
      })
      .catch((err) => {
        res
          .status(500)
          .json({ error: "error updating activity by activity id", err });
      });
  }
);

router.delete(
  "/user/:id/activity/:activityId",
  authMW,
  checkFriend,
  (req, res) => {
    Activity.deleteActivity(req.params.activityId)
      .then((deleted) => {
        if (deleted === 0) {
          res.status(400).json({
            error:
              "nothing deleted, mostly likely because this activity doesn't exist",
          });
        } else {
          res
            .status(200)
            .json({ success: "Deleted this number of entries.", deleted });
        }
      })
      .catch((err) => {
        res.status(500).json({ error: "error deleting activity from trip" });
      });
  }
);

//ADMIN ROUTES
router.get("/", authMW, checkRole("admin"), (req, res) => {
  Activity.getActivities()
    .then((activities) => {
      res.status(200).json(activities);
    })
    .catch((err) => {
      res.status(500).json({ error: "error getting activities" });
    });
});

router.get("/:id", authMW, checkRole("admin"), (req, res) => {
  Activity.getActivity(req.params.id)
    .then((activity) => {
      res.status(200).json(activity);
    })
    .catch((err) => {
      res.status(500).json({
        error: "couldn't retrieve activity with specified id in params.",
        err,
      });
    });
});

router.post("/activityTrip/:tripId", authMW, checkRole("admin"), (req, res) => {
  let activity = req.body;
  activity.trip_id = req.params.tripId;
  Activity.addActivity(activity)
    .then((added) => {
      res.status(201).json(added);
    })
    .catch((err) => {
      res.status(500).json({ error: "error adding activity to trip", err });
    });
});

router.put("/:activityId", authMW, checkRole("admin"), (req, res) => {
  Activity.updateActivity(req.params.activityId, req.body)
    .then((added) => {
      res.status(201).json(added);
    })
    .catch((err) => {
      res
        .status(500)
        .json({ error: "error updating activity by activity id", err });
    });
});

router.delete("/:activityId", authMW, checkRole("admin"), (req, res) => {
  Activity.deleteActivity(req.params.activityId)
    .then((deleted) => {
      if (deleted === 0) {
        res.status(400).json({
          error:
            "nothing deleted, mostly likely because this activity doesn't exist",
        });
      } else {
        res
          .status(200)
          .json({ success: "Deleted this number of entries.", deleted });
      }
    })
    .catch((err) => {
      res.status(500).json({ error: "error deleting activity from trip" });
    });
});

module.exports = router;
