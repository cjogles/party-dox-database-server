module.exports = (req, res, next) => {
  if (req.friend.id === parseInt(req.params.id)) {
    return next();
  } else {
    res
      .status(500)
      .json({
        message:
          "friend id passed as param does not match friend id from decoded token."
      });
  }
};
