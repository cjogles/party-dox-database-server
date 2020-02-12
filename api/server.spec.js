const request = require("supertest");
const server = require("./server.js");

describe.skip("server", function() {
  it("runs the tests", function() {
    expect(true).toBe(true);
  });

  describe("GET /", function() {
    it("should return the server is up message", function() {
      return request(server)
        .get("/")
        .then(res => {
          expect(res.status).toBe(200);
        });
    });
    it("Should return 'Server is up", function() {
      return request(server)
        .get("/")
        .then(res => {
          expect(res.body.message).toBe("Server up!");
        });
    });
  });
});
