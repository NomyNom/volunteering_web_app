// Profile.test.js

const request = require("supertest");
const express = require("express");
const profileRouter = require("../Routes/Profile"); 

const app = express();
app.use(express.json());
app.use("/api/profile", profileRouter);

describe("Profile API", () => {
  describe("GET /api/profile/:userId", () => {
    it("should return the profile for a valid userId", async () => {
      const res = await request(app).get("/api/profile/123");
      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty("fullName", "John Doe");
    });

    it("should return 404 if the profile is not found", async () => {
      const res = await request(app).get("/api/profile/999");
      expect(res.status).toBe(404);
      expect(res.body).toHaveProperty("msg", "Profile not found (dummy data)");
    });
  });

  describe("PUT /api/profile/:userId", () => {
    it("should create/update a profile with valid payload (all fields provided)", async () => {
      const payload = {
        fullName: "Jane Doe",
        address1: "456 Test St",
        address2: "Suite 123",
        city: "Austin",
        state: "TX",
        zip: "73301",
        skills: ["JavaScript", "Node.js"],
        preferences: "Preference B",
        availability: ["2025-03-06"],
      };

      const res = await request(app)
        .put("/api/profile/456")
        .send(payload);

      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty("msg", "Profile saved successfully (dummy data)");
      expect(res.body.profile).toMatchObject(payload);
    });

    it("should return 400 when required fields are missing", async () => {
      const payload = {
        fullName: "John Smith",
        address1: "123 Another Test St",
        // missing city, state, and zip
      };

      const res = await request(app)
        .put("/api/profile/789")
        .send(payload);

      expect(res.status).toBe(400);
      expect(res.body).toHaveProperty(
        "msg",
        "Full Name, Address, City, State, and Zip are required"
      );
    });

    it("should assign default values for optional fields if they are not provided", async () => {
      // only provide the required fields
      const payload = {
        fullName: "Default Test",
        address1: "No Optional St",
        city: "Default City",
        state: "TX",
        zip: "12345"
      };

      const res = await request(app)
        .put("/api/profile/111")
        .send(payload);

      expect(res.status).toBe(200);
      // defaults should be applied
      expect(res.body.profile.address2).toBe("");
      expect(res.body.profile.skills).toEqual([]);
      expect(res.body.profile.preferences).toBe("");
      expect(res.body.profile.availability).toEqual([]);
    });
  });
});
