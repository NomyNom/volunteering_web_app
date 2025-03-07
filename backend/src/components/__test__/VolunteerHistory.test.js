// VolunteerHistory.test.js

const request = require("supertest");
const express = require("express");

describe("Volunteer History API", () => {
  let app, historyRouter;

  // reset modules before each test so the in memory array is reinitialized
  beforeEach(() => {
    jest.resetModules();
    historyRouter = require("../Routes/VolunteerHistory"); // Adjust the path if needed.
    app = express();
    app.use(express.json());
    app.use("/api/volunteer/history", historyRouter);
  });

  describe("GET /api/volunteer/history", () => {
    it("should return all volunteer history records", async () => {
      const res = await request(app).get("/api/volunteer/history");
      expect(res.status).toBe(200);
      expect(Array.isArray(res.body.records)).toBe(true);
      // initially, one record is defined in the in memory array
      expect(res.body.records.length).toBe(1);
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
      // ensure the record matches our payload (besdes the generated id)
      expect(res.body.record).toMatchObject(newRecord);
      // check that an id was assigned
      expect(res.body.record).toHaveProperty("id");
      expect(typeof res.body.record.id).toBe("number");
    });

    it("should return 400 if the payload is invalid", async () => {
      // invalid record w multiple issues
      const invalidRecord = {
        eventName: "", // invalid empty string
        eventDescription: "A".repeat(501), // exceeeds 500 character
        location: "City Center",
        requiredSkills: "Not an array", // should be an array
        urgency: "Critical", // not "low", "medium", or "high"
        eventDate: "invalid-date", // invalid date
        participationStatus: "" // missing value
      };

      const res = await request(app)
        .post("/api/volunteer/history")
        .send(invalidRecord);

      expect(res.status).toBe(400);
      expect(Array.isArray(res.body.errors)).toBe(true);
      // check that all expected error messages are included
      expect(res.body.errors).toContain("Invalid or missing eventName (max 100 characters).");
      expect(res.body.errors).toContain("Invalid or missing eventDescription (max 500 characters).");
      expect(res.body.errors).toContain("Invalid or missing requiredSkills (must be an array).");
      expect(res.body.errors).toContain("Invalid or missing urgency (must be 'Low', 'Medium', or 'High').");
      expect(res.body.errors).toContain("Invalid or missing eventDate.");
      expect(res.body.errors).toContain("Invalid or missing participationStatus.");
    });
  });
});
