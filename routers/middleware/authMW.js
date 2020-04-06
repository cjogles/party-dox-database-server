const jwt = require("jsonwebtoken");
const { jwtSecret } = require("../../config/secret");

module.exports = (req, res, next) => {
  const token = req.headers.authorization;
  if (token) {
    jwt.verify(token, jwtSecret, (err, decodedToken) => {
      if (err) {
        res
          .status(401)
          .json({ message: "Error verifying token. You are UNAUTHORIZED" });
      } else {
        req.friend = {
          id: decodedToken.id,
          username: decodedToken.username,
          role: decodedToken.role
        };
        next();
      }
    });
  } else {
    res
      .status(401)
      .json({ message: "No token provided. You are UNAUTHORIZED" });
  }
};
