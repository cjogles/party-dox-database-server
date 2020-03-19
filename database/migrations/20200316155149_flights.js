exports.up = function(knex) {
  return knex.schema
    .createTable("flights", flight => {
      flight.increments("id");
      flight.string("departure_date");
      flight.string("departure_airport_name");
      flight.string("departure_airport_address");
      flight.string("departure_airport_phone");
      flight.string("departure_ticket_number");
      flight.string("departure_flight_number");
      flight.string("departure_terminal");
      flight.string("departure_gate");
      flight.string("departure_flight_note");
      flight.string("arrival_date");
      flight.string("arrival_airport_name");
      flight.string("arrival_airport_address");
      flight.string("arrival_airport_phone");
      flight.string("arrival_ticket_number");
      flight.string("arrival_flight_number");
      flight.string("arrival_terminal");
      flight.string("arrival_gate");
      flight.string("arrival_flight_note");
      flight.string("total_flight_cost");
      flight.integer("flight_combo_upvote");
    })

    .createTable("friend_trips", friendTrips => {
      friendTrips.increments("friend_trips_id");
      friendTrips
        .integer("friend_id")
        .unsigned()
        .references("id")
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
    })

    .createTable("trips_activities", trip_activity => {
      trip_activity.increments("trip_activity_id");
      trip_activity
        .integer("trip_id")
        .unsigned()
        .references("id")
        .inTable("trips")
        .onDelete("CASCADE")
        .onUpdate("CASCADE");
      trip_activity
        .integer("activity_id")
        .unsigned()
        .references("id")
        .inTable("activities")
        .onDelete("CASCADE")
        .onUpdate("CASCADE");
    })

    .createTable("trips_shopping_lists", shopping_list => {
      shopping_list.increments("trip_shopping_list_id");
      shopping_list
        .integer("trip_id")
        .unsigned()
        .references("id")
        .inTable("trips")
        .onDelete("CASCADE")
        .onUpdate("CASCADE");
      shopping_list
        .integer("shopping_list_id")
        .unsigned()
        .references("id")
        .inTable("shopping_lists")
        .onDelete("CASCADE")
        .onUpdate("CASCADE");
    })

    .createTable("trips_parking", trips_parking => {
      trips_parking.increments("trip_parking_id");
      trips_parking
        .integer("trip_id")
        .unsigned()
        .references("id")
        .inTable("trips")
        .onDelete("CASCADE")
        .onUpdate("CASCADE");
      trips_parking
        .integer("parking_id")
        .unsigned()
        .references("id")
        .inTable("parking")
        .onDelete("CASCADE")
        .onUpdate("CASCADE");
    })

    .createTable("trips_flights", trips_flight => {
      trips_flight.increments("trip_flight_id");
      trips_flight
        .integer("trip_id")
        .unsigned()
        .references("id")
        .inTable("trips")
        .onDelete("CASCADE")
        .onUpdate("CASCADE");
      trips_flight
        .integer("flight_id")
        .unsigned()
        .references("id")
        .inTable("flights")
        .onDelete("CASCADE")
        .onUpdate("CASCADE");
    });
};
exports.down = function(knex) {
  return knex.schema
    .dropTableIfExists("flights")
    .dropTableIfExists("friend_trips")
    .dropTableIfExists("trips_activities")
    .dropTableIfExists("trips_shopping_lists")
    .dropTableIfExists("trips_parking")
    .dropTableIfExists("trips_flights");
};
