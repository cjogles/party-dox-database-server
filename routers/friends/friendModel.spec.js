const db = require("../../database/knex");
// the data access file we are testing
const Friends = require("./friendModel");

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
      expect(friends).toHaveLength(2);
    });
  });
});
