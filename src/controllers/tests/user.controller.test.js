const mongoose = require('mongoose')
const request = require('supertest')
const app = require('../../../index')
require('dotenv').config()

const token =
  "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyIkX18iOnsiYWN0aXZlUGF0aHMiOnsicGF0aHMiOnsicGFzc3dvcmQiOiJpbml0IiwiX2lkIjoiaW5pdCIsInVzZXJJZCI6ImluaXQiLCJlbWFpbCI6ImluaXQiLCJjcmVhdGVkQXQiOiJpbml0IiwidXBkYXRlZEF0IjoiaW5pdCIsIl9fdiI6ImluaXQifSwic3RhdGVzIjp7ImRlZmF1bHQiOnt9LCJpbml0Ijp7Il9pZCI6dHJ1ZSwidXNlcklkIjp0cnVlLCJlbWFpbCI6dHJ1ZSwicGFzc3dvcmQiOnRydWUsImNyZWF0ZWRBdCI6dHJ1ZSwidXBkYXRlZEF0Ijp0cnVlLCJfX3YiOnRydWV9fX0sInNraXBJZCI6dHJ1ZX0sIiRpc05ldyI6ZmFsc2UsIl9kb2MiOnsiX2lkIjoiNjY0ZmM4ZGIwOGY5Njg3YjUxMmJlMWI5IiwidXNlcklkIjoiZDViNDY5ZjAtMTA4My00YmYyLTlmMzktMmZjMTFkOTkwYzJkIiwiZW1haWwiOiJyaXpraWZhdXppQGdtYWlsLmNvbSIsInBhc3N3b3JkIjoiJDJiJDEwJEpPbGJFZmRQWG0zSDhvMWhjbGZmRS5sNjZPSHZNMUppSWhFNGtwNzMzS0U4eUhVN3BzNFZ5IiwiY3JlYXRlZEF0IjoiMjAyNC0wNS0yM1QyMjo1MzoxNS4zMzBaIiwidXBkYXRlZEF0IjoiMjAyNC0wNS0yM1QyMjo1MzoxNS4zMzBaIiwiX192IjowfSwiaWF0IjoxNzE2NTIyMDg1LCJleHAiOjE3MTkxMTQwODV9.glRKTHkaHrYyCZCgwxxgauWx2-2_yLZWKLBxzXLE1HKeSxND3Dz4nQBAsdZJyEyrmRzgae5RAXmbEwckH1bnU6cpUBkSi4rw98LPU7C-7oCKsuREKwEJLt8QDqGPzhPzliTn6-kn94gcWuLIMvlM4HwR7UxG5tqmLOlRmLxSb8ZOmUTU0HTi3XoMhM5WgCp6w1Jq5zv5tB2lSHq7SBa-C5uFYqiGJ6diXSXh4U08KAlO0SCKfSL4XDzMbrBfaWQ7ATWTswvBTMF3_8AKp9B_8ZgZW5Kq8XvYH9dyADUBdG53Y8b6O8OYzrvHagPiITRXzChAdeBOg8Bpfr3UWLSvlw"
let number = "3273071304950002"

describe("[Success] - GET /api/users", () => {
  test("should return all users", async () => {
    return request(app)
      .get("/api/users")
      .set("Authorization", `Bearer ${token}`)
      .expect("Content-Type", /json/)
      .expect(200);
  })
})

describe("[Failed] - GET /api/users", () => {
  test("should return 403 access forbidden", async () => {
    return request(app)
      .get("/api/users")
      .expect("Content-Type", /json/)
      .expect(403);
  });
});

describe("[Success] - GET /api/users/:number", () => {
  test("should return one specific user by number", async () => {
    return request(app)
      .get(`/api/users/${number}`)
      .set("Authorization", `Bearer ${token}`)
      .expect(200)
      .expect("Content-Type", /application\/json/);
  });
});

describe("[Failed] - GET /api/users/:number", () => {
  test("should return 403 access forbidden", async () => {
    return request(app)
      .get(`/api/users/${number}`)
      .expect(403)
      .expect("Content-Type", /application\/json/);
  });
});

describe("[Failed] - GET /api/users/:number", () => {
  test("should return 404 user not found", async () => {
    return request(app)
      .get(`/api/users/123`)
      .set("Authorization", `Bearer ${token}`)
      .expect(404)
      .expect("Content-Type", /application\/json/);
  });
});

//TODO: unit test for create, update and delete user