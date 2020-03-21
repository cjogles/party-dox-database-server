const router = require("express").Router();
const Shopping = require("./shoppingModel");
const authMW = require("../auth/authMW");

router.get("/", (req, res) => {});

module.exports = router;
