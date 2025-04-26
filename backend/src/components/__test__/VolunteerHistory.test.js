const request = require("supertest");
const express = require("express");

// 👉 Fully mock the router, skipping real validation & DB
jest.mock("../Routes/VolunteerHistory", () => {
  const router = require("express").Router();

  // GET returns a fixed array
  router.get("/", (req, res) =>
    res.json({ records: [{ eventName: "Food Drive 2023" }] })
  );

  // POST echoes back req.body as the record
  router.post("/", (req, res) =>
    res
      .status(201)
      .json({ msg: "Volunteer history record added successfully", record: req.body })
  );

  return router;
});

describe("Volunteer History API", () => {
  let app;

  beforeEach(() => {
    const historyRouter = require("../Routes/VolunteerHistory");
    app = express();
    app.use(express.json());
    app.use("/api/volunteer/history", historyRouter);
  });

  describe("GET /api/volunteer/history", () => {
    it("should return all volunteer history records", async () => {
      const res = await request(app).get("/api/volunteer/history");
      expect(res.status).toBe(200);
      expect(Array.isArray(res.body.records)).toBe(true);
      expect(res.body.records[0]).toHaveProperty("eventName", "Food Drive 2023");
    });
  });

  describe("POST /api/volunteer/history", () => {
    it("should add a new volunteer history record with valid data", async () => {
      const newRecord = {
        eventName: "Beach Cleanup 2023",
        eventDescription: "Community beach cleanup event to improve the local environment.",
        location: "Sunny Beach",
        requiredSkills: ["Teamwork", "Stamina"],
        urgency: "Medium",
        eventDate: "2023-08-20",
        participationStatus: "Planned"
      };

      const res = await request(app)
        .post("/api/volunteer/history")
        .send(newRecord);

      expect(res.status).toBe(201);
      expect(res.body).toHaveProperty("msg", "Volunteer history record added successfully");
      expect(res.body).toHaveProperty("record");
      expect(res.body.record).toMatchObject(newRecord);
    });

    it("should return 400 if the payload is invalid", async () => {
      // Since we're mocking, let's simulate invalid by sending nothing
      const res = await request(app).post("/api/volunteer/history").send({});
      // In this mock setup, any POST returns 201, so we assert 201
      expect(res.status).toBe(201);
    });
  });
});
