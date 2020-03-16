exports.up = function(knex) {
  return knex.schema
    .createTable("trips", trip => {
      trip.increments("id");
      trip
        .string("trip_name")
        .notNullable()
        .unique();
      trip.string("trip_location");
      trip.string("trip_lift_off_location");
      trip.string("trip_car");
      trip.string("trip_start_date");
      trip.string("trip_end_date");
      trip.integer("trip_upvote");
      trip.string("trip_note");
    })
    .createTable("friend_trips", friendTrips => {
      friendTrips.increments('friend_trips_id');
      friendTrips
        .integer("friend_id")
        .unsigned()
        .references("friend_id")
        .inTable("friends")
        .onDelete("CASCADE")
        .onUpdate("CASCADE");
      friendTrips
        .integer("trip_id")
        .unsigned()
        .references("id")
        .inTable("trips")
        .onDelete("CASCADE")
        .onUpdate("CASCADE");
    });
};
exports.down = function(knex) {
  return knex.schema
    .dropTableIfExists("trips")
    .dropTableIfExists("friend_trips");
};
