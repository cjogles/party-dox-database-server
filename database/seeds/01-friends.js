const bcrypt = require("bcryptjs");

exports.seed = function(knex) {
  return knex("friends").then(function() {
    return knex("friends").insert([
      {
        id: 1,
        username: "username1",
        password: bcrypt.hashSync("password1", bcrypt.genSaltSync(10)),
        friend_name: "user1",
        friend_profile_pic: "profilepic1",
        friend_email: "email1",
        friend_phone: "phone1",
      },
      {
        id: 2,
        username: "username2",
        password: bcrypt.hashSync("password2", bcrypt.genSaltSync(10)),
        friend_name: "user2",
        friend_profile_pic: "profilepic2",
        friend_email: "email2",
        friend_phone: "phone2",
      },
      {
        id: 3,
        username: "username3",
        password: bcrypt.hashSync("password3", bcrypt.genSaltSync(10)),
        friend_name: "user3",
        friend_profile_pic: "profilepic3",
        friend_email: "email3",
        friend_phone: "phone3",
      },
    ]);
  });
};
