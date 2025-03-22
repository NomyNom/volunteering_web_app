// src/components/__test__/Event.test.js

const request = require("supertest");
const express = require("express");
const mongoose = require("mongoose");
const EventDetails = require("../Models/EventDetails");
const eventRouter = require("../Routes/Event");

const app = express();
app.use(express.json());
app.use("/api/events", eventRouter);

// Define a valid event payload once for reuse in tests
const validEventPayload = {
  eventName: "Community Clean-Up",
  eventDescription: "Help clean up the local park and surrounding areas.",
  location: "Central Park, New York",
  requiredSkills: ["cleaning", "organizing"],
  urgency: "High",
  eventDate: "2025-12-15"
};

describe("Event API", () => {
  let consoleErrorSpy;

  // Suppress console.error globally during tests so the output isn't filled w errors
  beforeAll(() => {
    consoleErrorSpy = jest.spyOn(console, "error").mockImplementation(() => {});
  });

  afterAll(() => {
    consoleErrorSpy.mockRestore();
  });

  // Clear mocks before each test (do not restore them so the global spy stays in effect)
  beforeEach(() => {
    jest.clearAllMocks();
  });

  // POST /api/events - Create a new event
  describe("POST /api/events", () => {
    it("should create a new event with valid data", async () => {
      const res = await request(app).post("/api/events").send(validEventPayload);
      expect(res.status).toBe(201);
      expect(res.body).toHaveProperty("msg", "Event created");
      // Check that the event has an _id (Mongoose uses _id by default)
      expect(res.body.event).toHaveProperty("_id");
    });

    it("should return 400 for invalid data (e.g., invalid eventDate)", async () => {
      const invalidEvent = { ...validEventPayload, eventDate: "invalid-date" };
      const res = await request(app).post("/api/events").send(invalidEvent);
      expect(res.status).toBe(400);
      expect(res.body).toHaveProperty("error", "Invalid event date");
    });

    it("should return 500 on server error (create)", async () => {
      // Force an error by mocking the save method on the EventDetails prototype
      const saveSpy = jest
        .spyOn(EventDetails.prototype, "save")
        .mockRejectedValue(new Error("Forced test error"));
      const res = await request(app).post("/api/events").send(validEventPayload);
      expect(res.status).toBe(500);
      expect(res.body).toHaveProperty("error", "Server error while creating event");
      saveSpy.mockRestore();
    });
  });

  // GET /api/events - Get all events
  describe("GET /api/events", () => {
    it("should return an empty array if no events exist", async () => {
      const res = await request(app).get("/api/events");
      expect(res.status).toBe(200);
      expect(Array.isArray(res.body.events)).toBe(true);
      expect(res.body.events.length).toBe(0);
    });

    it("should return all events after one is created", async () => {
      // Create an event first
      const eventData = {
        eventName: "Food Drive",
        eventDescription: "Collect food for those in need.",
        location: "Downtown Shelter, Los Angeles",
        requiredSkills: ["communication"],
        urgency: "Medium",
        eventDate: "2025-11-20"
      };
      await request(app).post("/api/events").send(eventData);
      const res = await request(app).get("/api/events");
      expect(res.status).toBe(200);
      expect(Array.isArray(res.body.events)).toBe(true);
      expect(res.body.events.length).toBe(1);
    });

    it("should return 500 if there's a server error retrieving events", async () => {
      const findSpy = jest
        .spyOn(EventDetails, "find")
        .mockRejectedValue(new Error("Forced test error"));
      const res = await request(app).get("/api/events");
      expect(res.status).toBe(500);
      expect(res.body).toHaveProperty("error", "Server error while retrieving events");
      findSpy.mockRestore();
    });
  });

  // GET /api/events/:id - Get a specific event by ID
  describe("GET /api/events/:id", () => {
    it("should return a specific event by ID", async () => {
      const createRes = await request(app).post("/api/events").send(validEventPayload);
      const createdId = createRes.body.event._id; // use _id property
      const res = await request(app).get(`/api/events/${createdId}`);
      expect(res.status).toBe(200);
      expect(res.body.event).toHaveProperty("eventName", "Community Clean-Up");
    });

    it("should return 404 if the event is not found", async () => {
      const fakeId = new mongoose.Types.ObjectId().toHexString();
      const res = await request(app).get(`/api/events/${fakeId}`);
      expect(res.status).toBe(404);
      expect(res.body).toHaveProperty("error", "Event not found");
    });

    it("should return 404 if the ID format is invalid", async () => {
      const res = await request(app).get("/api/events/invalid-id");
      expect(res.status).toBe(404);
      expect(res.body).toHaveProperty("error", "Event not found");
    });

    it("should return 500 if there's a server error retrieving a specific event", async () => {
      const fakeId = new mongoose.Types.ObjectId().toHexString();
      const findByIdSpy = jest
        .spyOn(EventDetails, "findById")
        .mockRejectedValue(new Error("Forced test error"));
      const res = await request(app).get(`/api/events/${fakeId}`);
      expect(res.status).toBe(500);
      expect(res.body).toHaveProperty("error", "Server error while retrieving event");
      findByIdSpy.mockRestore();
    });
  });

  // PUT /api/events/:id - Update a specific event by ID
  describe("PUT /api/events/:id", () => {
    it("should update an existing event with valid data", async () => {
      const createRes = await request(app).post("/api/events").send(validEventPayload);
      const createdId = createRes.body.event._id;
      const updatedData = {
        eventName: "Community Clean-Up Updated",
        eventDescription: "Updated description.",
        location: "Central Park, New York",
        requiredSkills: ["cleaning", "organizing"],
        urgency: "High",
        eventDate: "2025-12-20"
      };
      const res = await request(app).put(`/api/events/${createdId}`).send(updatedData);
      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty("msg", "Event updated");
      expect(res.body.event).toHaveProperty("eventName", "Community Clean-Up Updated");
    });

    it("should return 400 if updated data is invalid", async () => {
      const createRes = await request(app).post("/api/events").send(validEventPayload);
      const createdId = createRes.body.event._id;
      // Make requiredSkills invalid (should be an array)
      const invalidUpdate = { ...validEventPayload, requiredSkills: "NotAnArray" };
      const res = await request(app).put(`/api/events/${createdId}`).send(invalidUpdate);
      expect(res.status).toBe(400);
      expect(res.body).toHaveProperty("error", "Invalid data types");
    });

    it("should return 404 if the event to update is not found", async () => {
      const fakeId = new mongoose.Types.ObjectId().toHexString();
      const res = await request(app).put(`/api/events/${fakeId}`).send(validEventPayload);
      expect(res.status).toBe(404);
      expect(res.body).toHaveProperty("error", "Event not found");
    });

    it("should return 500 if there's a server error updating event", async () => {
      const createRes = await request(app).post("/api/events").send(validEventPayload);
      const createdId = createRes.body.event._id;
      const updateSpy = jest
        .spyOn(EventDetails, "findByIdAndUpdate")
        .mockRejectedValue(new Error("Forced test error"));
      const updatedData = { ...validEventPayload, eventName: "Updated name" };
      const res = await request(app).put(`/api/events/${createdId}`).send(updatedData);
      expect(res.status).toBe(500);
      expect(res.body).toHaveProperty("error", "Server error while updating event");
      updateSpy.mockRestore();
    });
  });

  // DELETE /api/events/:id - Delete a specific event by ID
  describe("DELETE /api/events/:id", () => {
    it("should delete an existing event", async () => {
      const createRes = await request(app).post("/api/events").send(validEventPayload);
      const createdId = createRes.body.event._id;
      const deleteRes = await request(app).delete(`/api/events/${createdId}`);
      expect(deleteRes.status).toBe(200);
      expect(deleteRes.body).toHaveProperty("msg", "Event deleted");
    });

    it("should return 404 if the event does not exist", async () => {
      const fakeId = new mongoose.Types.ObjectId().toHexString();
      const res = await request(app).delete(`/api/events/${fakeId}`);
      expect(res.status).toBe(404);
      expect(res.body).toHaveProperty("error", "Event not found");
    });

    it("should return 500 if there's a server error deleting event", async () => {
      const createRes = await request(app).post("/api/events").send(validEventPayload);
      const createdId = createRes.body.event._id;
      const deleteSpy = jest
        .spyOn(EventDetails, "findByIdAndDelete")
        .mockRejectedValue(new Error("Forced test error"));
      const res = await request(app).delete(`/api/events/${createdId}`);
      expect(res.status).toBe(500);
      expect(res.body).toHaveProperty("error", "Server error while deleting event");
      deleteSpy.mockRestore();
    });
  });
});
