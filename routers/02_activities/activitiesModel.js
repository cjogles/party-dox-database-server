const db = require("../../database/knex");

module.exports = {
  getActivities() {
    return db("activities");
  },
  getActivity(id) {
    return db("activities").where("id", id);
  },
  getActivityByTrip(tripId) {
    return db("activities").where("trip_id", tripId);
  },
  addActivity(activity) {
    return db("activities").insert(activity, "*").returning("*");
  },
  deleteActivity(activityId) {
    return db("activities").where("id", activityId).del();
  },
  updateActivity(id, activity) {
    return db("activities").where("id", id).update(activity, "*");
  },
};
