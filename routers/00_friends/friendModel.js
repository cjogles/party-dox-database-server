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
  FindById(friendId) {
    return db("friends")
      .where("id", friendId)
      .select(
        "id",
        "friend_name",
        "username",
        "friend_email",
        "friend_phone",
        "friend_profile_pic"
      );
  },
  add(newFriend) {
    return db("friends").insert(newFriend, "*");
  },
  update(friendId, newFriendInfo) {
    return db("friends").where("id", friendId).update(newFriendInfo, "*");
  },
  delete(friendId) {
    return db("friends").where("id", friendId).del();
  },
};
