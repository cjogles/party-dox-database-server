exports.up = function (knex) {
  return knex.schema.createTable("activities", (activity) => {
    activity.increments("id");
    activity
      .integer("trip_id")
      .unsigned()
      .references("id")
      .inTable("trips")
      .onDelete("CASCADE")
      .onUpdate("CASCADE");
    activity.string("activity_name").notNullable();
    activity.string("activity_description");
    activity.timestamp("activity_start_date");
    activity.timestamp("activity_end_date");
    activity.string("activity_address");
    activity.string("activity_phone");
    activity.integer("activity_upvote");
    activity.string("activity_notes");
  });
};
exports.down = function (knex) {
  return knex.schema.dropTableIfExists("activities");
};
