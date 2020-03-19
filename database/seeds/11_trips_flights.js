exports.seed = function(knex) {
  return knex("trips_flights").then(function() {
    return knex("trips_flights").insert([
      {
        trip_flight_id: 1,
        trip_id: 1,
        flight_id: 1
      },
      {
        trip_flight_id: 2,
        trip_id: 1,
        flight_id: 2
      },
      {
        trip_flight_id: 3,
        trip_id: 1,
        flight_id: 3
      },
      {
        trip_flight_id: 4,
        trip_id: 2,
        flight_id: 1
      },
      {
        trip_flight_id: 5,
        trip_id: 2,
        flight_id: 2
      },
      {
        trip_flight_id: 6,
        trip_id: 2,
        flight_id: 3
      },
      {
        trip_flight_id: 7,
        trip_id: 3,
        flight_id: 1
      },
      {
        trip_flight_id: 8,
        trip_id: 3,
        flight_id: 2
      },
      {
        trip_flight_id: 9,
        trip_id: 3,
        flight_id: 3
      }
    ]);
  });
};
