const db = require("../../database/knex");
// the data access file we are testing
const Friends = require("./friendModel");

/* ************** CLEAN UP DATA *************** */
const knexCleaner = require("knex-cleaner");
const secret = process.env.SECRET;
const knex = require("knex")({
  client: "pg",
  connection: {
    host: "localhost",
    user: "postgres",
    password: "Wavygravy12!",
    database: "test_partydox"
  }
});
knexCleaner.clean(knex).then(function() {
  // your database is now clean
});
/* ******************************************* */

describe("friends model", () => {
  describe("insert()", () => {
    it("should insert the provided friends into the db", async () => {
      await Friends.add({
        username: "gaffer",
        password: "password",
        friend_name: "frodo"
      });
      await Friends.add({
        username: "yoyo",
        password: "password",
        friend_name: "sam"
      });
      const friends = await db("friends");
      expect(friends).toHaveLength(5);
    });
  });
});
