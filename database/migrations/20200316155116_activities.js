exports.up = function(knex) {
  return knex.schema.createTable("activities", activity => {
    activity.increments("id");
    activity.string("activity_name").notNullable();
    activity.string("activity_description");
    activity.string("activity_start_date");
    activity.string("activity_end_date");
    activity.string("activity_address");
    activity.string("activity_phone");
    activity.integer("activity_upvote");
    activity.string("activity_note");
  });
};
exports.down = function(knex) {
  return knex.schema.dropTableIfExists("activities");
};
