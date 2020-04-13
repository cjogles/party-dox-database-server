const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const compression = require("compression");

const friendRouter = require("../routers/00_friends/friendRouter");
const tripRouter = require("../routers/01_trips/tripsRouter");
const activityRouter = require("../routers/02_activities/activitiesRouter");
const shoppingRouter = require("../routers/03_shopping/shoppingRouter");
const parkingRouter = require("../routers/04_parking/parkingRouter");
const flightRouter = require("../routers/05_flights/flightsRouter");

const server = express();

server.use(compression());
server.use(helmet());
server.use(cors());
server.use(express.json());

server.use("/friends", friendRouter);
server.use("/trips", tripRouter);
server.use("/activity", activityRouter);
server.use("/shopping", shoppingRouter);
server.use("/parking", parkingRouter);
server.use("/flights", flightRouter);

server.get("/", (req, res) => {
  res.status(200).json({ api: "running" });
});

module.exports = server;
