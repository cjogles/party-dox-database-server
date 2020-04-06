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
  addTrip(friend_id, trip) {
    return db.transaction(trx => {
      return db("trips")
        .transacting(trx)
        .insert(trip, "*")
        .returning("id")
        .then(res => {
          return db("friend_trips")
            .transacting(trx)
            .insert({ friend_id: friend_id, trip_id: res[0] })
            .returning("trip_id");
        })
        .then(trx.commit)
        .catch(trx.rollback);
    });
  },
  updateTrip(friend_id, trip_id, newTrip, joinTable) {
    console.log(joinTable);
    // return db.transaction(trx => {
    //   return db("trips")
    //     .transacting(trx)
    //     .where("trip_id", trip_id)
    //     .update(trip, "*")
    //     .returning("id")
    //     .then(res => {
    //       return db("friend_trips")
    //         .transacting(trx)
    //         .where("friend_trips_id")
    //         .insert({ friend_id: friend_id, trip_id: res[0] })
    //         .returning("trip_id");
    //     })
    //     .then(trx.commit)
    //     .catch(trx.rollback);
    // });
  },
  deleteTrip(friend_id, trip, trip_id) {
    return db.transaction(trx => {
      return db("trips")
        .transacting(trx)
        .where("trip_id", trip_id)
        .del()
        .then(res => {
          return db("friend_trips")
            .transacting(trx)
            .where()
            .del();
        })
        .then(trx.commit)
        .catch(trx.rollback);
    });
  }
};
