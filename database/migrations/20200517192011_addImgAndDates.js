exports.up = function (knex) {
  return knex.schema
    .table("friends", (friend) => {
      friend.binary("friend_profile_pic").alter();
    })
    .table("trips", (trip) => {
      trip.timestamp("trip_start_date").defaultTo(knex.fn.now(6)).alter();
      trip.timestamp("trip_end_date").defaultTo(knex.fn.now(6)).alter();
    })
    .table("activities", (activity) => {
      activity
        .timestamp("activity_start_date")
        .defaultTo(knex.fn.now(6))
        .alter();
      activity.timestamp("activity_end_date").defaultTo(knex.fn.now(6)).alter();
    })
    .table("flights", (flight) => {
      flight.timestamp("departure_date").defaultTo(knex.fn.now(6)).alter();
      flight.timestamp("arrival_date").defaultTo(knex.fn.now(6)).alter();
    });
};

exports.down = function (knex) {
  return knex.schema
    .table("friends", (friend) => {
      friend.string("friend_profile_pic").alter();
    })
    .table("trips", (trip) => {
      trip.string("trip_start_date").alter();
      trip.string("trip_end_date").alter();
    })
    .table("activities", (activity) => {
      activity.string("activity_start_date").alter();
      activity.string("activity_end_date").alter();
    })
    .table("flights", (flight) => {
      flight.string("departure_date").alter();
      flight.string("arrival_date").alter();
    });
};
