exports.up = function (knex) {
  return knex.schema
    .alterTable("friends", (friend) => {
      friend.binary("friend_profile_pic");
    })
    .alterTable("trips", (trip) => {
      trip.timestamp("trip_start_date");
      trip.timestamp("trip_end_date");
    })
    .alterTable("activities", (activity) => {
      activity.timestamp("activity_start_date");
      activity.timestamp("activity_end_date");
    })
    .alterTable("flights", (flight) => {
      flight.timestamp("departure_date");
      flight.timestamp("arrival_date");
    });
};

exports.down = function (knex) {
  return knex.schema
    .alterTable("friends", (friend) => {
      friend.string("friend_profile_pic");
    })
    .alterTable("trips", (trip) => {
      trip.string("trip_start_date");
      trip.string("trip_end_date");
    })
    .alterTable("activities", (activity) => {
      activity.string("activity_start_date");
      activity.string("activity_end_date");
    })
    .alterTable("flights", (flight) => {
      flight.string("departure_date");
      flight.string("arrival_date");
    });
};
