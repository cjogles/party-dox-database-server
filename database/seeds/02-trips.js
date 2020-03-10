exports.seed = function(knex) {
  return knex("trips").then(function() {
    return knex("trips").insert([
      {
        id: 1,
        trip_name: "trip1",
        trip_location: "location1",
        trip_lift_off_location: "lift_off1",
        trip_car: "car1",
        trip_start_date: "trip_start_date1",
        trip_end_date: "trip_end_date2",
        trip_upvote: 1,
        trip_note: "note1",
        friends_id: 1
        // foreign keys to add later
        // activity_id: 1,
        // shopping_list_id: 1,
        // parking_id: 1,
        // flight_id: 1
      },
      {
        id: 2,
        trip_name: "trip2",
        trip_location: "location2",
        trip_lift_off_location: "lift_off2",
        trip_car: "car2",
        trip_start_date: "trip_start_date2",
        trip_end_date: "trip_end_date2",
        trip_upvote: 2,
        trip_note: "note2",
        friends_id: 2
        // foreign keys to add later
        // activity_id: 2,
        // shopping_list_id: 2,
        // parking_id: 2,
        // flight_id: 2
      },
      {
        id: 3,
        trip_name: "trip3",
        trip_location: "location3",
        trip_lift_off_location: "lift_off3",
        trip_car: "car3",
        trip_start_date: "trip_start_date3",
        trip_end_date: "trip_end_date3",
        trip_upvote: 3,
        trip_note: "note3",
        friends_id: 3
        // foreign keys to add later
        // activity_id: 3,
        // shopping_list_id: 3,
        // parking_id: 3,
        // flight_id: 3
      },
    ]);
  });
};
