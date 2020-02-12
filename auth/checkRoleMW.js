module.exports = role => {
  return (req, res, next) => {
    if (role === req.user.role) {
      next();
    } else {
      res.status(403).json({ message: "Access denied. Inappropriate Role." });
    }
  };
};
