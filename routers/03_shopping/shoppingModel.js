const db = require("../../database/knex");

module.exports = {
  getShoppingLists() {
    return db("shopping_lists");
  },
  getShoppingList(id) {
    return db("shopping_lists").where("id", id);
  },
  getShoppingListsByTrip(tripId) {
    return db("shopping_lists").where("trip_id", tripId);
  },
  addShoppingList(shoppingList) {
    return db("shopping_lists").insert(shoppingList, "*").returning("*");
  },
  deleteShoppingList(shoppingListId) {
    return db("shopping_lists").where("id", shoppingListId).del();
  },
  updateShoppingList(id, shoppingList) {
    return db("shopping_lists").where("id", id).update(shoppingList, "*");
  },
};
