const db = require("../../database/knex");

module.exports = {
  getAll(query) {
    const { username, friend_name, friend_email, friend_phone } = req.query;
    const knexQuery = db("friends");
    if (username) {
      knexQuery.where("username", "like", `%${username}%`);
    } else if (friend_name) {
      knexQuery.where("friend_name", "like", `%${friend_name}%`);
    } else if (friend_email) {
      knexQuery.where("friend_email", "like", `%${friend_email}%`);
    } else if (friend_phone) {
      knexQuery.where("friend_phone", "like", `%${friend_phone}%`);
    }
    return knexQuery;
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
