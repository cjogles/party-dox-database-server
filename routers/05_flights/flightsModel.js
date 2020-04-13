const db = require("../../database/knex");

module.exports = {
  getFlights() {
    return db("flights");
  },
  getFlightsById(id) {
    return db("flights").where("id", id);
  },
  getFlightsByTripId(tripId) {
    return db("flights").where("trip_id", tripId);
  },
  addFlight(flight) {
    return db("flights").insert(flight, "*").returning("*");
  },
  deleteFlight(flightId) {
    return db("flights").where("id", flightId).del();
  },
  updateFlight(flightId, flight) {
    return db("flights").where("id", flightId).update(flight, "*");
  },
};
