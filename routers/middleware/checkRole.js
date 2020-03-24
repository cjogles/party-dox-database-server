module.exports = role => {
  return (req, res, next) => {
    if (role === req.friend.role) {
      next();
    } else {
      res.status(403).json({ message: "access denied." });
    }
  };
};
