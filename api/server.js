const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const compression = require('compression');
const userRouter = require("../routers/users/userRouter");
const server = express();
server.use(compression());
server.use(helmet());
server.use(cors());
server.use(express.json());
server.use("/users", userRouter);
server.get("/", (req, res) => {
  res.status(200).json({ message: "Server is up and running." });
});
module.exports = server;
