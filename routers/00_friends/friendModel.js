const db = require("../../database/knex");

module.exports = {
  getAll(query) {
    const knexQuery = db("friends");
    if (query.username) {
      knexQuery.where("username", "like", `%${query.username}%`);
    }
    if (query.friend_name) {
      knexQuery.where("friend_name", "like", `%${query.friend_name}%`);
    }
    if (query.friend_email) {
      knexQuery.where("friend_email", "like", `%${query.friend_email}%`);
    }
    if (query.friend_phone) {
      knexQuery.where("friend_phone", "like", `%${query.friend_phone}%`);
    }
    return knexQuery;
  },
  findBy(friend) {
    return db("friends").where(friend);
  },
  FindById(id) {
    return db("friends").where("id", id).select("*");
  },
  add(friend) {
    return db("friends").insert(friend, "*");
  },
  update(id, friend) {
    return db("friends").where("id", id).update(friend, "*");
  },
  delete(id) {
    return db("friends").where("id", id).del();
  },
};
