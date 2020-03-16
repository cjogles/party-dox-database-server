exports.seed = function(knex) {
    return knex('friend_trips')                        
      .then(function () {
        return knex('friend_trips').insert([                        
          {
            friend_trips_id: 1,
            friend_id: 3,
            trip_id: 3,
          },
          {
            friend_trips_id: 2,
            friend_id: 1,
            trip_id: 1,
          },
          {
            friend_trips_id: 3,
            friend_id: 2,
            trip_id: 2,
          },
        ]);
      });
  };