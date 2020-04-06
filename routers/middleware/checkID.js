module.exports = (req, res, next) => {
  if (!isNaN(req.params.id)) {
    return next();
  } else {
    res.status(500).json({
      message: "id is not a number."
    });
  }
};
