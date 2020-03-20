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
  findBy(friend) {
    console.log(friend.username);
    return db("friends")
      .where({ username: friend.username })
      .select("username", "password");
  }
};
