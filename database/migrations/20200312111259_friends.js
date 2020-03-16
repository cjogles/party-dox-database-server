exports.up = function(knex) {
    return knex.schema
      .createTable("friends", friend => {
        friend.increments('friend_id');
        friend
          .string("username")
          .notNullable()
          .unique();
        friend.string("password").notNullable();
        friend.string("friend_name").notNullable();
        friend.string("friend_profile_pic");
        friend.string("friend_email");
        friend.string("friend_phone");
      })
  };
  exports.down = function(knex) {
    return knex.schema
      .dropTableIfExists("friends");
  };