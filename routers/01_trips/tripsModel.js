const db = require("../../database/knex");

module.exports = {
  getJoin() {
    return db("friend_trips");
  },
  getAllTrips() {
    return db("trips");
  },
  getFriendTrips(id) {
    return db("friend_trips")
      .where("friend_id", id)
      .innerJoin("trips", "friend_trips.trip_id", "trips.id");
  },
  getTrip(id) {
    return db("trips").where("id", id);
  },
  addTrip(friend_id, trip) {
    return db.transaction((trx) => {
      return db("trips")
        .transacting(trx)
        .insert(trip, "*")
        .returning("id")
        .then((res) => {
          return db("friend_trips")
            .transacting(trx)
            .insert({ friend_id: friend_id, trip_id: res[0] })
            .returning("*");
        })
        .then(trx.commit)
        .catch(trx.rollback);
    });
  },
  updateTrip(trip_id, newTrip) {
    return db("trips").where("id", trip_id).update(newTrip, "*");
  },
  deleteTrip(tripId) {
    return db.transaction((trx) => {
      return db("friend_trips")
        .transacting(trx)
        .where("trip_id", tripId)
        .del()
        .then((res) => {
          return db("trips").transacting(trx).where("id", tripId).del();
        })
        .then(trx.commit)
        .catch(trx.rollback);
    });
  },
};
