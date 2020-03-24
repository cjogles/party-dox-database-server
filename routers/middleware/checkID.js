const Friend = require("../00_friends/friendModel");

module.exports = (req, res, next) => {
  if (!isNaN(req.params.id)) {
    return next();
  } else {
    next(new Error("Invalid ID"));
  }
};
