const db = require("../data/dbConfig.js");
const request = require("supertest");
const server = require("../api/server.js");

const { add } = require("../users/userModel.js");

describe("userModel", () => {
  beforeEach(async () => {
    await db("users").truncate();
  });

  describe("add()", () => {
    it("should add the user to the database", async () => {
      await add({ username: "Username", password: "Password321" });
      const user = await db("users");
      expect(user).toHaveLength(1);
    });
  });

  describe("logging in", () => {
    it("should return 200 when user logs in after registering", async () => {
      const credentials = { username: "Username", password: "Password321" };
      const loginCredentials = {
        username: "Username",
        password: "Password321"
      };

      let response = await request(server)
        .post("/api/auth/register")
        .send(credentials);

      expect(response.status).toBe(201);

      let login = await request(server)
        .post("/api/auth/login")
        .send(loginCredentials);
      expect(login.status).toBe(200);
    });

    it("should return a 200 response on login", async () => {
      return request(server)
        .post("/api/auth/register")
        .send({ username: "Username", password: "Password321" })
        .expect(200);
    });
  });
});
