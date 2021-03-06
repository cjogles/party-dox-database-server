exports.up = function(knex) {
  return knex.schema.createTable("shopping_lists", shopping_list => {
    shopping_list.increments("id");
    shopping_list
      .integer("trip_id")
      .unsigned()
      .references("id")
      .inTable("trips")
      .onDelete("CASCADE")
      .onUpdate("CASCADE");
    shopping_list.string("item_name");
    shopping_list.string("item_cost");
    shopping_list.string("item_buyer");
    shopping_list.integer("item_upvote");
    shopping_list.string("item_notes");
  });
};
exports.down = function(knex) {
  return knex.schema.dropTableIfExists("shopping_lists");
};
