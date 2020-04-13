const db = require("../../database/knex");

module.exports = {
  getParking() {
    return db("parking");
  },
  getParkingById(parkingId) {
    return db("parking").where("id", parkingId);
  },
  getParkingByTripId(tripId) {
    return db("parking").where("trip_id", tripId);
  },
  addParking(parking) {
    return db("parking").insert(parking, "*").returning("*");
  },
  deleteParking(parkingId) {
    return db("parking").where("id", parkingId).del();
  },
  updateParking(parkingId, parking) {
    return db("parking").where("id", parkingId).update(parking, "*");
  },
};
