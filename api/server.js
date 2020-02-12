const express = require("express");
const cors = require("cors");
const helmet = require("helmet");

// import routers here:
// i.e. <const authRouter = require("../auth/authRouter.js");>

const server = express();

server.use(helmet());
server.use(cors());
server.use(express.json());

// allow server to use routers here:
// i.e. login and registration router example --> <server.use("/auth", authRouter);>

server.get("/", (req, res) => {
  res.status(200).json({ message: "Server is up and running." });
});

module.exports = server;
