const mongoose = require('mongoose')
const request = require('supertest')
const app = require('../../../index')
require('dotenv').config()

describe("GET /api/users", () => {
  test("should return all users", async () => {
    return request(app)
      .get("/api/users")
      .expect("Content-Type", /json/)
      .expect(200);
  });
});