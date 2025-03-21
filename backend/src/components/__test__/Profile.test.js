// Profile.test.js

const request = require("supertest");
const express = require("express");
const mongoose = require("mongoose");
const profileRouter = require("../Routes/Profile");

const app = express();
app.use(express.json());
app.use("/api/profile", profileRouter);

const validUserId = new mongoose.Types.ObjectId().toHexString();
const nonExistentUserId = new mongoose.Types.ObjectId().toHexString();

describe("Profile API", () => {
  beforeEach(async () => {
    // Seed one profile for GET/update/delete tests
    const payload = {
      user: validUserId,
      fullName: "John Doe",
      address1: "123 Main St",
      address2: "Apt 1",
      city: "Test City",
      state: "TX",
      zipCode: "12345",
      skills: ["testing"],
      preferences: "None",
      availability: ["2025-03-05"],
    };
    await request(app).post("/api/profile").send(payload);
  });

  describe("POST /api/profile", () => {
    it("creates a new profile", async () => {
      const newId = new mongoose.Types.ObjectId().toHexString();
      const payload = {
        user: newId,
        fullName: "Jane Smith",
        address1: "456 Park Ave",
        city: "Houston",
        state: "TX",
        zipCode: "77002",
        skills: ["nodejs"],
        preferences: "",
        availability: ["2025-04-01"],
      };

      const res = await request(app).post("/api/profile").send(payload);
      expect(res.status).toBe(201);
      expect(res.body).toHaveProperty("msg", "Profile created successfully");
      expect(res.body.profile).toHaveProperty("user", newId);
    });

    it("returns 400 if required fields are missing", async () => {
      const payload = { user: new mongoose.Types.ObjectId().toHexString(), fullName: "Test" };
      const res = await request(app).post("/api/profile").send(payload);
      expect(res.status).toBe(400);
      expect(res.body).toHaveProperty("msg", "Missing required fields");
    });

    it("returns 400 if profile already exists", async () => {
      const payload = {
        user: validUserId,
        fullName: "John Doe",
        address1: "123 Main St",
        city: "Test City",
        state: "TX",
        zipCode: "12345",
        skills: ["testing"],
        preferences: "",
        availability: ["2025-03-05"],
      };
      const res = await request(app).post("/api/profile").send(payload);
      expect(res.status).toBe(400);
      expect(res.body).toHaveProperty("msg", "Profile already exists for this user");
    });
  });

  describe("GET /api/profile/:userId", () => {
    it("returns the existing profile", async () => {
      const res = await request(app).get(`/api/profile/${validUserId}`);
      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty("fullName", "John Doe");
    });

    it("returns 404 if not found", async () => {
      const res = await request(app).get(`/api/profile/${nonExistentUserId}`);
      expect(res.status).toBe(404);
      expect(res.body).toHaveProperty("msg", "Profile not found");
    });

    it("returns 404 on invalid ID format", async () => {
      const res = await request(app).get("/api/profile/invalid-id");
      expect(res.status).toBe(404);
      expect(res.body).toHaveProperty("msg", "Profile not found");
    });
  });

  describe("PUT /api/profile/:userId", () => {
    it("updates an existing profile", async () => {
      const payload = {
        fullName: "John Updated",
        address1: "789 Elm St",
        city: "Austin",
        state: "TX",
        zipCode: "73301",
        skills: ["testing"],
        preferences: "",
        availability: ["2025-03-07"]
      };
      const res = await request(app).put(`/api/profile/${validUserId}`).send(payload);
      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty("msg", "Profile updated successfully");
      expect(res.body.profile.fullName).toBe("John Updated");
    });

    it("returns 400 if required fields missing", async () => {
      const res = await request(app).put(`/api/profile/${validUserId}`).send({ fullName: "Incomplete" });
      expect(res.status).toBe(400);
      expect(res.body).toHaveProperty("msg", "Missing required fields");
    });

    it("returns 404 if profile does not exist", async () => {
      const payload = {
        fullName: "Nobody",
        address1: "Nowhere",
        city: "NA",
        state: "TX",
        zipCode: "00000",
        skills: ["testing"],
        preferences: "",
        availability: ["2025-03-07"]
      };
      const res = await request(app).put(`/api/profile/${nonExistentUserId}`).send(payload);
      expect(res.status).toBe(404);
      expect(res.body).toHaveProperty("msg", "Profile not found");
    });

    it("returns 404 on invalid ID format", async () => {
      const payload = {
        fullName: "Bad",
        address1: "Bad",
        city: "Bad",
        state: "TX",
        zipCode: "00000",
        skills: ["testing"],
        preferences: "",
        availability: ["2025-03-07"]
      };
      const res = await request(app).put("/api/profile/invalid-id").send(payload);
      expect(res.status).toBe(404);
      expect(res.body).toHaveProperty("msg", "Profile not found");
    });
  });

  describe("DELETE /api/profile/:userId", () => {
    it("deletes an existing profile", async () => {
      const res = await request(app).delete(`/api/profile/${validUserId}`);
      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty("msg", "Profile deleted successfully");
    });

    it("returns 404 if not found", async () => {
      const res = await request(app).delete(`/api/profile/${nonExistentUserId}`);
      expect(res.status).toBe(404);
      expect(res.body).toHaveProperty("msg", "Profile not found");
    });

    it("returns 404 on invalid ID format", async () => {
      const res = await request(app).delete("/api/profile/invalid-id");
      expect(res.status).toBe(404);
      expect(res.body).toHaveProperty("msg", "Profile not found");
    });
  });
});
