const mongoose = require('mongoose')
const request = require('supertest')
const app = require('../../../index')
const { reqAddUser, reqUpdateUser } = require('./user.test.data')
require('dotenv').config()

const token =
  "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyIkX18iOnsiYWN0aXZlUGF0aHMiOnsicGF0aHMiOnsicGFzc3dvcmQiOiJpbml0IiwiX2lkIjoiaW5pdCIsInVzZXJJZCI6ImluaXQiLCJlbWFpbCI6ImluaXQiLCJjcmVhdGVkQXQiOiJpbml0IiwidXBkYXRlZEF0IjoiaW5pdCIsIl9fdiI6ImluaXQifSwic3RhdGVzIjp7ImRlZmF1bHQiOnt9LCJpbml0Ijp7Il9pZCI6dHJ1ZSwidXNlcklkIjp0cnVlLCJlbWFpbCI6dHJ1ZSwicGFzc3dvcmQiOnRydWUsImNyZWF0ZWRBdCI6dHJ1ZSwidXBkYXRlZEF0Ijp0cnVlLCJfX3YiOnRydWV9fX0sInNraXBJZCI6dHJ1ZX0sIiRpc05ldyI6ZmFsc2UsIl9kb2MiOnsiX2lkIjoiNjY0ZmM4ZGIwOGY5Njg3YjUxMmJlMWI5IiwidXNlcklkIjoiZDViNDY5ZjAtMTA4My00YmYyLTlmMzktMmZjMTFkOTkwYzJkIiwiZW1haWwiOiJyaXpraWZhdXppQGdtYWlsLmNvbSIsInBhc3N3b3JkIjoiJDJiJDEwJEpPbGJFZmRQWG0zSDhvMWhjbGZmRS5sNjZPSHZNMUppSWhFNGtwNzMzS0U4eUhVN3BzNFZ5IiwiY3JlYXRlZEF0IjoiMjAyNC0wNS0yM1QyMjo1MzoxNS4zMzBaIiwidXBkYXRlZEF0IjoiMjAyNC0wNS0yM1QyMjo1MzoxNS4zMzBaIiwiX192IjowfSwiaWF0IjoxNzE2NTMwNTM3LCJleHAiOjE3MTkxMjI1Mzd9.VN1RHo5XRqlm0ZgUrZJ93_x8oZ5oexkFkaMfx3VkrOEp9feLBJQPFYBaGJAxvEv2zG9GtIt26NxFv2Hb5APCz_ENDDiXrb5PMQbmw06BBsdTtWznJe8wZ1JOthsVqJfQqBVHfP1Ln-GCjU5YvPojGdcWqSFxohJHeOYCDkCLBfLVY8PL3qK1bxlcE7a8mUNCXXU7MWNgrJNdafPu5b2jDTCAihLvlQGGiWR2Fp8Tsd-l0DRPbjM8uKkI_k5qaRFjI3KfOjURi5zz6GBcqVU_oY5gT-q__0mSoKwGKZKtOXwS629qKFDsLHRgEVep7YpLUlAPCWBs2y0nsqDO7tW3AA"
let number
let userId

describe("POST /api/users", () => {
  test("should return 403 access forbidden", async () => {
    return request(app).post("/api/users").send(reqAddUser).expect(403);
  });
});

describe("POST /api/users", () => {
  test("should create a user", async () => {
    return request(app)
      .post("/api/users")
      .set("Authorization", `Bearer ${token}`)
      .send(reqAddUser)
      .expect(201)
      .then(({ body }) => {
        number = body.identityNumber
        userId = body._id
      });
  });
});

describe("GET /api/users", () => {
  test("should return all users", async () => {
    return request(app)
      .get("/api/users")
      .set("Authorization", `Bearer ${token}`)
      .expect("Content-Type", /json/)
      .expect(200);
  })
})

describe("GET /api/users", () => {
  test("should return 403 access forbidden", async () => {
    return request(app)
      .get("/api/users")
      .expect("Content-Type", /json/)
      .expect(403);
  });
});

describe("GET /api/users/:number", () => {
  test("should return one specific user by number", async () => {
    return request(app)
      .get(`/api/users/${number}`)
      .set("Authorization", `Bearer ${token}`)
      .expect(200)
      .expect("Content-Type", /application\/json/);
  });
});

describe("GET /api/users/:number", () => {
  test("should return 403 access forbidden", async () => {
    return request(app)
      .get(`/api/users/${number}`)
      .expect(403)
      .expect("Content-Type", /application\/json/);
  });
});

describe("GET /api/users/:number", () => {
  test("should return 404 user not found", async () => {
    return request(app)
      .get(`/api/users/123`)
      .set("Authorization", `Bearer ${token}`)
      .expect(404)
      .expect("Content-Type", /application\/json/);
  });
});

describe("PUT /api/users/:id", () => {
  test("should update a specific user by id", async () => {
    return request(app)
      .put(`/api/users/${userId}`)
      .set("Authorization", `Bearer ${token}`)
      .send(reqUpdateUser)
      .expect(201);
  });
});

describe("PUT /api/users/:id", () => {
  test("should return 403 access forbidden", async () => {
    return request(app)
      .put(`/api/users/${userId}`)
      .send(reqUpdateUser)
      .expect(403);
  });
});

describe("DELETE /api/users/:id", () => {
  test("should delete a specific user by id", async () => {
    return request(app)
      .delete(`/api/users/${userId}`)
      .set("Authorization", `Bearer ${token}`)
      .expect(200);
  });
});

describe("DELETE /api/users/:id", () => {
  test("should return 403 access forbidden", async () => {
    return request(app)
      .delete(`/api/users/${userId}`)
      .expect(403);
  });
});