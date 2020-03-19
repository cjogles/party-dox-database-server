exports.up = function(knex) {
  return knex.schema.createTable("shopping_lists", shopping_list => {
    shopping_list.increments("id");
    shopping_list.string("item_name").notNullable();
    shopping_list.string("item_cost");
    shopping_list.string("item_buyer").notNullable();
    shopping_list.integer("item_upvote");
    shopping_list.string("item_note");
  });
};
exports.down = function(knex) {
  return knex.schema.dropTableIfExists("shopping_lists");
};
