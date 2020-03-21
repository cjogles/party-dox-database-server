exports.up = function(knex) {
  return knex.schema.createTable("parking", parking_lot => {
    parking_lot.increments("id");
    parking_lot
      .integer("trip_id")
      .unsigned()
      .references("id")
      .inTable("trips")
      .onDelete("CASCADE")
      .onUpdate("CASCADE");
    parking_lot.string("parking_lot_name").notNullable();
    parking_lot.string("parking_lot_address");
    parking_lot.string("parking_lot_phone");
    parking_lot.string("parking_lot_cost").notNullable();
    parking_lot.string("parking_lot_hours");
    parking_lot.integer("parking_upvote");
    parking_lot.string("parking_notes");
  });
};
exports.down = function(knex) {
  return knex.schema.dropTableIfExists("parking");
};
