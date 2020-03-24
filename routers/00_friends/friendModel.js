const db = require("../../database/knex");

module.exports = {
  getAll() {
    return db("friends");
  },
  add(friend) {
    return db("friends").insert(friend, "*");
  },
  delete(id) {
    return db("friends")
      .where("id", id)
      .del();
  },
  update(id, friend) {
    return db("friends")
      .where("id", id)
      .update(friend, "*");
  },
  findBy(friend) {
    return db("friends").where(friend);
  },
  FindById(id) {
    return db("friends")
      .where("id", id)
      .select("*");
  }
};
