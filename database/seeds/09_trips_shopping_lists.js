exports.seed = function(knex) {
  return knex("trips_shopping_lists").then(function() {
    return knex("trips_shopping_list").insert([
      {
        trip_shopping_list_id: 1,
        trip_id: 1,
        shopping_list_id: 1
      },
      {
        trip_shopping_list_id: 2,
        trip_id: 1,
        shopping_list_id: 2
      },
      {
        trip_shopping_list_id: 3,
        trip_id: 1,
        shopping_list_id: 3
      },
      {
        trip_shopping_list_id: 4,
        trip_id: 2,
        shopping_list_id: 1
      },
      {
        trip_shopping_list_id: 5,
        trip_id: 2,
        shopping_list_id: 2
      },
      {
        trip_shopping_list_id: 6,
        trip_id: 2,
        shopping_list_id: 3
      },
      {
        trip_shopping_list_id: 7,
        trip_id: 3,
        shopping_list_id: 1
      },
      {
        trip_shopping_list_id: 8,
        trip_id: 3,
        shopping_list_id: 2
      },
      {
        trip_shopping_list_id: 9,
        trip_id: 3,
        shopping_list_id: 3
      }
    ]);
  });
};
