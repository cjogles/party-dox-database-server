exports.seed = function(knex) {
    return knex('friend-trips')                        
      .then(function () {
        return knex('friend_trips').insert([                        
          {
            id: 1,
            friend_id: 1,
            trip_id: 2,
          },
          {
            id: 2,
            friend_id: 2,
            trip_id: 1,
          },
          {
            id: 3,
            friend_id: 3,
          },
        ]);
      });
  };