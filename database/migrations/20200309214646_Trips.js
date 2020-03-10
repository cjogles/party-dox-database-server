exports.up = function(knex) {
  // id, friends_id, trip_name, trip_location, trip_lift_off_location
  // trip_car, trip_start_date, trip_end_date, trip_upvote,
  // trip_note
  return knex.schema.createTable("trips", trip => {
    trip.increments();

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

    trip
      .integer("friends_id")
      .unsigned()
      .notNullable()
      .references("id")
      .inTable("friends")
      .onDelete("CASCADE")
      .onUpdate("CASCADE");
      
// Other foreign keys to be migrated later on
    // trip
    //   .integer("activity_id")
    //   .unsigned()
    //   .notNullable()
    //   .references("id")
    //   .inTable("activities")
    //   .onDelete("CASCADE")
    //   .onUpdate("CASCADE");

    // trip
    //   .integer("shopping_list_id")
    //   .unsigned()
    //   .notNullable()
    //   .references("id")
    //   .inTable("shopping_list")
    //   .onDelete("CASCADE")
    //   .onUpdate("CASCADE");

    // trip
    //   .integer("parking_id")
    //   .unsigned()
    //   .notNullable()
    //   .references("id")
    //   .inTable("parking")
    //   .onDelete("CASCADE")
    //   .onUpdate("CASCADE");

    // trip
    //   .integer("flight_id")
    //   .unsigned()
    //   .notNullable()
    //   .references("id")
    //   .inTable("flights")
    //   .onDelete("CASCADE")
    //   .onUpdate("CASCADE");
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists("trips");
};
