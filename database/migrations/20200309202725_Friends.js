exports.up = function(knex) {
  // id, username, password, friend_name, friend_profile_pic, friend_email, friend_phone, trip_id
  return knex.schema
    .createTable("friends", friend => {
      friend.increments();

      friend
        .string("username")
        .notNullable()
        .unique();

      friend.string("password").notNullable();

      friend.string("friend_name").notNullable();

      friend.string("friend_profile_pic");

      friend.string("friend_email");

      friend.string("friend_phone");

      friend
        .integer("trip_id")
        .unsigned()
        .notNullable()
        .references("id")
        .inTable("trips")
        .onDelete("CASCADE")
        .onUpdate("CASCADE");

    });
};

exports.down = function(knex) {
  return knex.schema
    .dropTableIfExists("friends")
};
