const db = require("../../database/knex");

module.exports = {
  getAllTrips() {
    return db("trips");
  },
  getFriendTrips(id) {
    return db("friend_trips")
      .where("friend_id", id)
      .innerJoin("trips", "friend_trips.trip_id", "trips.id");
  },
  addTrip(tripDetails) {
    return db("trips")
      .insert(tripDetails)
      .returning("trip_id");
  }
};
