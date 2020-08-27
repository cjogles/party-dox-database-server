exports.up = function (knex) {
  return knex.schema
    .createTable("flights", (flight) => {
      flight.increments("id");
      flight
        .integer("trip_id")
        .unsigned()
        .references("id")
        .inTable("trips")
        .onDelete("CASCADE")
        .onUpdate("CASCADE");
      flight.string("departure_date");
      flight.string("departure_airport_name");
      flight.string("departure_airport_address");
      flight.string("departure_airport_phone");
      flight.string("departure_ticket_number");
      flight.string("departure_flight_number");
      flight.string("departure_terminal");
      flight.string("departure_gate");
      flight.string("departure_flight_notes");
      flight.string("arrival_date");
      flight.string("arrival_airport_name");
      flight.string("arrival_airport_address");
      flight.string("arrival_airport_phone");
      flight.string("arrival_ticket_number");
      flight.string("arrival_flight_number");
      flight.string("arrival_terminal");
      flight.string("arrival_gate");
      flight.string("arrival_flight_notes");
      flight.string("total_flight_cost");
      flight.integer("flight_combo_upvote");
    })
    .createTable("friend_trips", (friendTrips) => {
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
      friendTrips
        .increments("friend_trips_id")
        .primary(["friend_id", "trip_id"]);
    });
};
exports.down = function (knex) {
  return knex.schema
    .dropTableIfExists("flights")
    .dropTableIfExists("friend_trips");
};
