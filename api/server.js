const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const compression = require("compression");

const friendRouter = require("../routers/friends/friendRouter");

const server = express();

server.use(compression());
server.use(helmet());
server.use(cors());
server.use(express.json());

server.use("/friends", friendRouter);

server.get("/", (req, res) => {
  res.status(200).json({ api: "running" });
});

module.exports = server;
