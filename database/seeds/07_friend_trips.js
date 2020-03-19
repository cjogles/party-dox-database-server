exports.seed = function(knex) {
  return knex("friend_trips").then(function() {
    return knex("friend_trips").insert([
      {
        friend_trips_id: 1,
        friend_id: 1,
        trip_id: 1
      },
      {
        friend_trips_id: 2,
        friend_id: 1,
        trip_id: 2
      },
      {
        friend_trips_id: 3,
        friend_id: 1,
        trip_id: 3
      },
      {
        friend_trips_id: 4,
        friend_id: 2,
        trip_id: 1
      },
      {
        friend_trips_id: 5,
        friend_id: 2,
        trip_id: 2
      },
      {
        friend_trips_id: 6,
        friend_id: 2,
        trip_id: 3
      },
      {
        friend_trips_id: 7,
        friend_id: 3,
        trip_id: 1
      },
      {
        friend_trips_id: 8,
        friend_id: 3,
        trip_id: 2
      },
      {
        friend_trips_id: 9,
        friend_id: 3,
        trip_id: 3
      }
    ]);
  });
};
