// Event.test.js

const request = require("supertest");
const express = require("express");

describe("Events API", () => {
  let app, eventsRouter;

  // reset modules and in memory events' array before each test
  beforeEach(() => {
    jest.resetModules();
    eventsRouter = require("../Routes/Event");
    app = express();
    app.use(express.json());
    app.use("/api/events", eventsRouter);
  });

  // valid event payload
  const validEvent = {
    eventName: "Sample Event",
    eventDescription: "A test event",
    location: "Test Location",
    requiredSkills: ["Skill1", "Skill2"],
    urgency: "High",
    eventDate: "2025-12-31",
  };

  // ---------------------------
  // POST /api/events
  // ---------------------------
  describe("POST /api/events", () => {
    it("should create a new event with valid data", async () => {
      const res = await request(app)
        .post("/api/events")
        .send(validEvent);

      expect(res.status).toBe(201);
      expect(res.body).toHaveProperty("msg", "Event created");
      expect(res.body).toHaveProperty("event");
      expect(res.body.event).toHaveProperty("id");
      // check that returned event matches our payload except id
      expect(res.body.event).toMatchObject({
        ...validEvent,
      });
    });

    it("should return 400 if required fields are missing", async () => {
      // omit eventDescription to force validation error
      const incompleteEvent = {
        ...validEvent,
        eventDescription: null,
      };
      const res = await request(app)
        .post("/api/events")
        .send(incompleteEvent);

      expect(res.status).toBe(400);
      expect(res.body).toHaveProperty("error", "All fields are required");
    });
  });

  // ---------------------------
  // GET /api/events
  // ---------------------------
  describe("GET /api/events", () => {
    it("should return an empty array if no events exist", async () => {
      const res = await request(app).get("/api/events");
      expect(res.status).toBe(200);
      expect(Array.isArray(res.body.events)).toBe(true);
      expect(res.body.events.length).toBe(3); // expecting 3 events for dummy data
    });

    it("should return all events after one is created", async () => {
      // create an event first
      await request(app).post("/api/events").send(validEvent);

      // now fetch all events
      const res = await request(app).get("/api/events");
      expect(res.status).toBe(200);
      expect(res.body.events.length).toBe(4);
      // expect(res.body.events[0]).toMatchObject(validEvent);
    });
  });
  
  // ---------------------------
  // GET /api/events/:id
  // ---------------------------
  describe("GET /api/events/:id", () => {
    it("should return 404 if the event is not found", async () => {
      const res = await request(app).get("/api/events/nonexistent");
      expect(res.status).toBe(404);
      expect(res.body).toHaveProperty("error", "Event not found");
    });

    it("should return a specific event by ID", async () => {
      // create an event first
      const createRes = await request(app)
        .post("/api/events")
        .send(validEvent);

      const createdId = createRes.body.event.id;

      // fetch it by ID
      const getRes = await request(app).get(`/api/events/${createdId}`);
      expect(getRes.status).toBe(200);
      expect(getRes.body.event).toHaveProperty("id", createdId);
      expect(getRes.body.event).toMatchObject(validEvent);
    });
  });

  // ---------------------------
  // PUT /api/events/:id
  // ---------------------------
  describe("PUT /api/events/:id", () => {
    it("should update an existing event", async () => {
      // create an event first
      const createRes = await request(app)
        .post("/api/events")
        .send(validEvent);

      const createdId = createRes.body.event.id;
      const updatedData = {
        ...validEvent,
        eventName: "Updated Event Name",
      };

      // update the event
      const updateRes = await request(app)
        .put(`/api/events/${createdId}`)
        .send(updatedData);

      expect(updateRes.status).toBe(200);
      expect(updateRes.body).toHaveProperty("msg", "Event updated");
      expect(updateRes.body.event).toMatchObject(updatedData);
    });

    it("should return 404 if the event does not exist", async () => {
      const res = await request(app)
        .put("/api/events/nonexistent")
        .send(validEvent);
      expect(res.status).toBe(404);
      expect(res.body).toHaveProperty("error", "Event not found");
    });

    it("should return 400 if updated data is invalid", async () => {
      // create an event first
      const createRes = await request(app)
        .post("/api/events")
        .send(validEvent);

      const createdId = createRes.body.event.id;
      // make requiredSkills a string instead of an array
      const invalidUpdate = { ...validEvent, requiredSkills: "NotAnArray" };

      const updateRes = await request(app)
        .put(`/api/events/${createdId}`)
        .send(invalidUpdate);

      expect(updateRes.status).toBe(400);
      expect(updateRes.body).toHaveProperty("error", "Invalid data types");
    });
  });

  // ---------------------------
  // DELETE /api/events/:id
  // ---------------------------
  describe("DELETE /api/events/:id", () => {
    it("should delete an existing event", async () => {
      // create an event
      const createRes = await request(app)
        .post("/api/events")
        .send(validEvent);

      const createdId = createRes.body.event.id;

      // delete the event
      const deleteRes = await request(app).delete(`/api/events/${createdId}`);
      expect(deleteRes.status).toBe(200);
      expect(deleteRes.body).toHaveProperty("msg", "Event deleted");

      // confirm it's actually gone
      const getRes = await request(app).get(`/api/events/${createdId}`);
      expect(getRes.status).toBe(404);
      expect(getRes.body).toHaveProperty("error", "Event not found");
    });

    it("should return 404 if the event does not exist", async () => {
      const res = await request(app).delete("/api/events/nonexistent");
      expect(res.status).toBe(404);
      expect(res.body).toHaveProperty("error", "Event not found");
    });
  });
});
