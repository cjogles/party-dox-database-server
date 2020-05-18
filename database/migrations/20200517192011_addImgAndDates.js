exports.up = function (knex) {
  return knex.schema
    .alterTable("friends", (friend) => {
      friend.binary("friend_profile_pic").alter();
    })
    .alterTable("trips", (trip) => {
      trip
        .timestamp("trip_start_date", { precision: 6 })
        .defaultTo(knex.fn.now(6))
        .alter();
      trip
        .timestamp("trip_end_date", { precision: 6 })
        .defaultTo(knex.fn.now(6))
        .alter();
    })
    .alterTable("activities", (activity) => {
      activity
        .timestamp("activity_start_date", { precision: 6 })
        .defaultTo(knex.fn.now(6))
        .alter();
      activity
        .timestamp("activity_end_date", { precision: 6 })
        .defaultTo(knex.fn.now(6))
        .alter();
    })
    .alterTable("flights", (flight) => {
      flight
        .timestamp("departure_date", { precision: 6 })
        .defaultTo(knex.fn.now(6))
        .alter();
      flight
        .timestamp("arrival_date", { precision: 6 })
        .defaultTo(knex.fn.now(6))
        .alter();
    });
};

exports.down = function (knex) {
  return knex.schema
    .alterTable("friends", (friend) => {
      friend.string("friend_profile_pic").alter();
    })
    .alterTable("trips", (trip) => {
      trip.string("trip_start_date").alter();
      trip.string("trip_end_date").alter();
    })
    .alterTable("activities", (activity) => {
      activity.string("activity_start_date").alter();
      activity.string("activity_end_date").alter();
    })
    .alterTable("flights", (flight) => {
      flight.string("departure_date").alter();
      flight.string("arrival_date").alter();
    });
};
