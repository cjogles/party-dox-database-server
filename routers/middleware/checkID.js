const db = require("../00_friends/friendModel");

module.exports = (req, res, next) => {
  if (!isNaN(req.params.id)) {
    db.FindById(req.params.id)
      .then((success) => {
        if (success.length === 0) {
          res
            .status(404)
            .json({ error: "friend does not exist by specified id" });
        } else {
          return next();
        }
      })
      .catch((err) => {
        res.status(500).json({ error: "error finding friend" });
      });
  } else {
    res.status(500).json({
      message: "id is not a number.",
    });
  }
};
