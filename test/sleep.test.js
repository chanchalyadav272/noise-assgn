const request = require("supertest");
const mongoose = require("mongoose");
const express = require("express");
const bodyParser = require("body-parser");
const Sleep = require("../src/models/sleep");
const sleepRoutes = require("../src/routes/sleepRoutes");
const connectDB = require("../src/databases/db");

require("dotenv").config();
let server;

const app = express();
app.use(bodyParser.json());
app.use("/sleep", sleepRoutes);

jest.setTimeout(20000);

beforeAll(async () => {
  await connectDB();
  //   console.log("in 1");
});

afterEach(async () => {
  await Sleep.deleteMany();
});

afterAll(async () => {
  await mongoose.connection.close();
  //   console.log("in 3");
});

describe("Sleep Tracker App API", () => {
  test("POST /sleep - Success", async () => {
    // console.log("in first");
    const response = await request(app).post("/sleep").send({
      userId: "user1",
      hours: 8,
      timestamp: new Date(),
    });
    // console.log(response.body);
    expect(response.statusCode).toBe(200);
    expect(response.body["Added"].userId).toBe("user1");
    expect(response.body["Added"].hours).toBe(8);
  });

  test("POST /sleep - Missing Fields", async () => {
    const response = await request(app).post("/sleep").send({
      userId: "user1",
    });
    expect(response.statusCode).toBe(400);
  });

  test("POST /sleep - Invalid Data", async () => {
    const response = await request(app).post("/sleep").send({
      userId: "user1",
      hours: "eight",
      timestamp: new Date(),
    });
    expect(response.statusCode).toBe(400);
  });

  test("GET /sleep/:userId - Success", async () => {
    const sleepRecord = await Sleep.create({
      userId: "user1",
      hours: 8,
      timestamp: new Date(),
    });

    const response = await request(app).get("/sleep/user1");
    expect(response.statusCode).toBe(200);
    expect(response.body["SleepRecords"].length).toBe(1);
    expect(response.body["SleepRecords"][0]._id).toBe(sleepRecord.id);
  });

  test("GET /sleep/:userId - No Records Found", async () => {
    const response = await request(app).get("/sleep/nonexistentuser");
    expect(response.statusCode).toBe(404);
  });

  test("DELETE /sleep/:recordId - Success", async () => {
    const sleepRecord = await Sleep.create({
      userId: "user1",
      hours: 8,
      timestamp: new Date(),
    });

    const response = await request(app).delete(`/sleep/${sleepRecord._id}`);
    expect(response.statusCode).toBe(200);
    expect(response.body["Deleted"]._id).toBe(sleepRecord.id);
  });

  test("DELETE /sleep/:recordId - Record Not Found", async () => {
    const response = await request(app).delete(
      "/sleep/6649f65dc0748f32f2c885b7"
    );
    expect(response.statusCode).toBe(404);
  });
});
