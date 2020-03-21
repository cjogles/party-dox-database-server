const db = require("../../database/knex");

module.exports = {
  getAllFriendTrips(id) {
    return db("friend_trips").where("friend_id", id);
  }
};
