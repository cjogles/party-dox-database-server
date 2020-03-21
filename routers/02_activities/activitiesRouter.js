const router = require("express").Router();
const Activity = require("./activitiesModel");
const authMW = require("../auth/authMW");

router.get("/", (req, res) => {});

module.exports = router;
