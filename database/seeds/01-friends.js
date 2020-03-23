const bcrypt = require("bcryptjs");

exports.seed = function(knex) {
  return knex("friends").then(function() {
    return knex("friends").insert([
      {
        id: 1,
        username: "jackattack",
        password: bcrypt.hashSync("password1", bcrypt.genSaltSync(10)),
        friend_name: "Jack Johnson",
        friend_profile_pic: "profilepic1",
        friend_email: "email1",
        friend_phone: "phone1"
      },
      {
        id: 2,
        username: "wavy",
        password: bcrypt.hashSync("password2", bcrypt.genSaltSync(10)),
        friend_name: "Waverli Ogles",
        friend_profile_pic: "profilepic2",
        friend_email: "email2",
        friend_phone: "phone2"
      },
      {
        id: 3,
        username: "bogles",
        password: bcrypt.hashSync("password3", bcrypt.genSaltSync(10)),
        friend_name: "Ben Ogles",
        friend_profile_pic: "profilepic3",
        friend_email: "email3",
        friend_phone: "phone3"
      }
    ]);
  });
};
