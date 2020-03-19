exports.seed = function(knex) {
  return knex("trips_activities").then(function() {
    return knex("trips_activities").insert([
      {
        trip_activity_id: 1,
        trip_id: 1,
        activity_id: 1
      },
      {
        trip_activity_id: 2,
        trip_id: 1,
        activity_id: 2
      },
      {
        trip_activity_id: 3,
        trip_id: 1,
        activity_id: 3
      },
      {
        trip_activity_id: 4,
        trip_id: 2,
        activity_id: 1
      },
      {
        trip_activity_id: 5,
        trip_id: 2,
        activity_id: 2
      },
      {
        trip_activity_id: 6,
        trip_id: 2,
        activity_id: 3
      },
      {
        trip_activity_id: 7,
        trip_id: 3,
        activity_id: 1
      },
      {
        trip_activity_id: 8,
        trip_id: 3,
        activity_id: 2
      },
      {
        trip_activity_id: 9,
        trip_id: 3,
        activity_id: 3
      }
    ]);
  });
};
