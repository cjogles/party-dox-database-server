const router = require("express").Router();
const Parking = require("./parkingModel");
const authMW = require("../auth/authMW");

router.get("/", (req, res) => {});

module.exports = router;
