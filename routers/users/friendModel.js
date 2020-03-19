const db = require("../../database/dataBaseConfig");

module.exports = {
  add,
  findBy
};

// add a friend to partydox DB, has an id, username, password, friend_name, friend_profile_pic, friend_email and a friend_phone. currently only getting passed username and pass.
function add(friend) {
  db("friends").insert(friend);
}

function findBy(filter) {
  db("friends").where(filter);
}
