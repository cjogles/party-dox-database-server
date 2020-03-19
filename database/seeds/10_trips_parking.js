exports.seed = function(knex) {
  return knex("trips_parking").then(function() {
    return knex("trips_parking").insert([
      {
        trip_parking_id: 1,
        trip_id: 1,
        parking_id: 1
      },
      {
        trip_parking_id: 2,
        trip_id: 1,
        parking_id: 2
      },
      {
        trip_parking_id: 3,
        trip_id: 1,
        parking_id: 3
      },
      {
        trip_parking_id: 4,
        trip_id: 2,
        parking_id: 1
      },
      {
        trip_parking_id: 5,
        trip_id: 2,
        parking_id: 2
      },
      {
        trip_parking_id: 6,
        trip_id: 2,
        parking_id: 3
      },
      {
        trip_parking_id: 7,
        trip_id: 3,
        parking_id: 1
      },
      {
        trip_parking_id: 8,
        trip_id: 3,
        parking_id: 2
      },
      {
        trip_parking_id: 9,
        trip_id: 3,
        parking_id: 3
      }
    ]);
  });
};
