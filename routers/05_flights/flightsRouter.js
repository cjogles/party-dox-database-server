const router = require("express").Router();
const Flight = require("./flightsModel");
const authMW = require("../auth/authMW");

router.get("/", (req, res) => {});

module.exports = router;
