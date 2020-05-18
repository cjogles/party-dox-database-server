exports.up = function (knex) {
  return knex.schema.createTable("friends", (friend) => {
    friend.increments("id");
    friend.string("username").notNullable().unique();
    friend.string("role");
    friend.string("password").notNullable();
    friend.string("friend_name").notNullable();
    friend.binary("friend_profile_pic");
    friend.string("friend_email");
    friend.string("friend_phone");
  });
};
exports.down = function (knex) {
  return knex.schema.dropTableIfExists("friends");
};
