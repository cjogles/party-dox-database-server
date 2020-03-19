exports.seed = function(knex) {
  return knex("activities").then(function() {
    return knex("activities").insert([
      {
        id: 1,
        activity_name: "activity1",
        activity_description: "activity_description_1",
        trip_lift_off_location: "lift_off1",
        activity_start_date: "activitystartdate1",
        activity_end_date: "activityenddate1",
        activity_address: "activityaddress1",
        activity_phone: "activityphone1",
        activity_upvote: 1,
        activity_note: "note1"
      },
      {
        id: 2,
        activity_name: "activity2",
        activity_description: "activity_description_2",
        trip_lift_off_location: "lift_off2",
        activity_start_date: "activitystartdate2",
        activity_end_date: "activityenddate2",
        activity_address: "activityaddress2",
        activity_phone: "activityphone2",
        activity_upvote: 2,
        activity_note: "note2"
      },
      {
        id: 3,
        activity_name: "activity3",
        activity_description: "activity_description_3",
        trip_lift_off_location: "lift_off3",
        activity_start_date: "activitystartdate3",
        activity_end_date: "activityenddate3",
        activity_address: "activityaddress3",
        activity_phone: "activityphone3",
        activity_upvote: 3,
        activity_note: "note3"
      }
    ]);
  });
};
