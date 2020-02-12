const db = require("../../database/dataBaseConfig.js");

module.exports = {
  add,
  find,
  findBy,
  findById,
  remove,
  update
};

async function add(user) {
  const [id] = await db("users").insert(user);

  return findById(id);
}

function find() {
  return db("users").select("*");
}

function findBy(filter) {
  return db("users").where(filter);
}

function findById(id) {
  return db("users")
    .select("id", "username")
    .where({ id })
    .first();
}

function remove(id) {
  return db("events")
    .where({ id })
    .delete();
}

function update(id, changes) {
  return db("events")
    .where({ id })
    .update(changes);
}
