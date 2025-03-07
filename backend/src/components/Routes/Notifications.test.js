// Notifications.test.js

const request = require("supertest");
const express = require("express");

describe("Notifications API", () => {
  let app, notificationsRouter;

  // reset modules and the in-memory data before each test
  beforeEach(() => {
    jest.resetModules();
    notificationsRouter = require("./Notifications");
    app = express();
    app.use(express.json());
    app.use("/api/notifications", notificationsRouter);
  });

  describe("GET /api/notifications", () => {
    it("should return all notifications", async () => {
      const res = await request(app).get("/api/notifications");
      expect(res.status).toBe(200);
      expect(Array.isArray(res.body.notifications)).toBe(true);

      // there should be 4 notifications from the in memory array by default
      expect(res.body.notifications.length).toBe(4);

      // optionally, check the first notification’s message
      expect(res.body.notifications[0]).toHaveProperty(
        "message",
        "New volunteer opportunity: Community Cleanup"
      );
    });
  });

  describe("POST /api/notifications", () => {
    it("should add a new notification with valid data", async () => {
      const newNotification = {
        message: "A brand-new notification",
        date: "2024-03-12",
        read: false,
      };

      const res = await request(app)
        .post("/api/notifications")
        .send(newNotification);

      expect(res.status).toBe(201);
      expect(res.body).toHaveProperty("msg", "Notification added successfully");
      expect(res.body).toHaveProperty("notification");

      // check that returned notification matches our data ands has an auto generated id
      expect(res.body.notification).toMatchObject(newNotification);
      expect(res.body.notification).toHaveProperty("id");
    });

    it("should default `read` to false if not provided", async () => {
      const newNotification = {
        message: "Notification without read field",
        date: "2024-04-01",
        // no read property
      };

      const res = await request(app)
        .post("/api/notifications")
        .send(newNotification);

      expect(res.status).toBe(201);
      expect(res.body.notification.read).toBe(false);
    });

    it("should return 400 if the payload is invalid", async () => {
        // providing an empty message/date and an invalid read value
        const invalidNotification = {
          message: "",
          date: "",
          read: "notABoolean",
        };
      
        const res = await request(app)
          .post("/api/notifications")
          .send(invalidNotification);
      
        expect(res.status).toBe(400);
        expect(Array.isArray(res.body.errors)).toBe(true);
        expect(res.body.errors).toContain("Invalid or missing message.");
        expect(res.body.errors).toContain("Invalid or missing date.");
        // dont expect an error for "read" since it gets defaulted to false before validation
      });
  });

  describe("PUT /api/notifications/markAllAsRead", () => {
    it("should mark all notifications as read", async () => {
      // initially, some notifications have read false
      const res = await request(app).put("/api/notifications/markAllAsRead");

      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty("msg", "All notifications marked as read");
      expect(Array.isArray(res.body.notifications)).toBe(true);

      // verify all are now read
      res.body.notifications.forEach((n) => {
        expect(n.read).toBe(true);
      });
    });
  });
});
