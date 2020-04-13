const router = require("express").Router();
const Shopping = require("./shoppingModel");
const authMW = require("../middleware/authMW");
const checkRole = require("../middleware/checkRole");
const checkFriend = require("../middleware/checkFriend");

//LOGGED IN USER ROUTES
router.get(
  "/user/:id/shoppingTrip/:tripId",
  authMW,
  checkFriend,
  (req, res) => {
    Shopping.getShoppingListsByTrip(req.params.tripId)
      .then((activity) => {
        res.status(200).json(activity);
      })
      .catch((err) => {
        res.status(500).json({
          error: "couldn't retrieve shopping list with specified id in params.",
          err,
        });
      });
  }
);

router.get(
  "/user/:id/shopping/:shoppingId",
  authMW,
  checkFriend,
  (req, res) => {
    Shopping.getShoppingList(req.params.shoppingId)
      .then((shoppingList) => {
        res.status(200).json(shoppingList);
      })
      .catch((err) => {
        res.status(500).json({
          error: "couldn't retrieve shopping list with specified id in params.",
          err,
        });
      });
  }
);
router.post(
  "/user/:id/shoppingTrip/:tripId",
  authMW,
  checkFriend,
  (req, res) => {
    let shoppingList = req.body;
    shoppingList.trip_id = req.params.tripId;
    Shopping.addShoppingList(shoppingList)
      .then((added) => {
        res.status(201).json(added);
      })
      .catch((err) => {
        res
          .status(500)
          .json({ error: "error adding shopping List to trip", err });
      });
  }
);

router.put(
  "/user/:id/shoppingList/:shoppingListId",
  authMW,
  checkFriend,
  (req, res) => {
    Shopping.updateShoppingList(req.params.shoppingListId, req.body)
      .then((updated) => {
        res.status(201).json(updated);
      })
      .catch((err) => {
        res.status(500).json({
          error: "error updating shopping List by shopping list id",
          err,
        });
      });
  }
);

router.delete(
  "/user/:id/shoppingList/:shoppingListId",
  authMW,
  checkFriend,
  (req, res) => {
    Shopping.deleteShoppingList(req.params.shoppingListId)
      .then((deleted) => {
        if (deleted === 0) {
          res.status(400).json({
            error:
              "nothing deleted, mostly likely because this shopping list doesn't exist",
          });
        } else {
          res
            .status(200)
            .json({ success: "Deleted this number of entries.", deleted });
        }
      })
      .catch((err) => {
        res
          .status(500)
          .json({ error: "error deleting shopping list from trip" });
      });
  }
);

//ADMIN ROUTES
router.get("/", authMW, checkRole("admin"), (req, res) => {
  Shopping.getShoppingLists()
    .then((activities) => {
      res.status(200).json(activities);
    })
    .catch((err) => {
      res.status(500).json({ error: "error getting shopping lists" });
    });
});

router.get("/:id", authMW, checkRole("admin"), (req, res) => {
  Shopping.getShoppingList(req.params.id)
    .then((shopping) => {
      res.status(200).json(shopping);
    })
    .catch((err) => {
      res.status(500).json({
        error: "couldn't retrieve shopping list with specified id in params.",
        err,
      });
    });
});

router.post("/shoppingTrip/:tripId", authMW, checkRole("admin"), (req, res) => {
  let shoppingList = req.body;
  shoppingList.trip_id = req.params.tripId;
  Shopping.addShoppingList(shoppingList)
    .then((added) => {
      res.status(201).json(added);
    })
    .catch((err) => {
      res.status(500).json({ error: "error adding shoppingList to trip", err });
    });
});

router.put("/:shoppingListId", authMW, checkRole("admin"), (req, res) => {
  Shopping.updateShoppingList(req.params.shoppingListId, req.body)
    .then((added) => {
      res.status(201).json(added);
    })
    .catch((err) => {
      res.status(500).json({
        error: "error updating shopping list by shopping list id",
        err,
      });
    });
});

router.delete("/:shoppingListId", authMW, checkRole("admin"), (req, res) => {
  Shopping.deleteShoppingList(req.params.shoppingListId)
    .then((deleted) => {
      if (deleted === 0) {
        res.status(400).json({
          error:
            "nothing deleted, mostly likely because this shopping list doesn't exist",
        });
      } else {
        res
          .status(200)
          .json({ success: "Deleted this number of entries.", deleted });
      }
    })
    .catch((err) => {
      res.status(500).json({ error: "error deleting shopping list from trip" });
    });
});

module.exports = router;
