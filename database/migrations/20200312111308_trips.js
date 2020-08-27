exports.up = function (knex) {
  return knex.schema.createTable("trips", (trip) => {
    trip.increments("id");
    trip.string("trip_name").notNullable().unique();
    trip.string("trip_description");
    trip.string("trip_location");
    trip.string("trip_lift_off_location");
    trip.string("trip_car");
    trip.string("trip_start_date");
    trip.string("trip_end_date");
    trip.integer("trip_upvote");
    trip.string("trip_notes");
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists("trips");
};
