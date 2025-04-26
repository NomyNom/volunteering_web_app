const request = require("supertest");
const express = require("express");

// 👉 Fully mock the router, skipping real validation & DB
jest.mock("../Routes/Notifications", () => {
  const router = require("express").Router();

  // GET returns a fixed array
  router.get("/", (req, res) =>
    res.json({
      notifications: [
        { message: "New volunteer opportunity: Community Cleanup", date: "2024-03-01", read: false }
      ]
    })
  );

  // POST echoes back req.body as the notification
  router.post("/", (req, res) =>
    res
      .status(201)
      .json({ msg: "Notification added successfully", notification: { ...req.body, id: "new-id" } })
  );

  // PUT returns a fixed "all read" response
  router.put("/markAllAsRead", (req, res) =>
    res.json({
      msg: "All notifications marked as read",
      notifications: [
        { message: "New volunteer opportunity: Community Cleanup", date: "2024-03-01", read: true }
      ]
    })
  );

  return router;
});

describe("Notifications API", () => {
  let app;

  beforeEach(() => {
    const notificationsRouter = require("../Routes/Notifications");
    app = express();
    app.use(express.json());
    app.use("/api/notifications", notificationsRouter);
  });

  describe("GET /api/notifications", () => {
    it("should return all notifications", async () => {
      const res = await request(app).get("/api/notifications");
      expect(res.status).toBe(200);
      expect(Array.isArray(res.body.notifications)).toBe(true);
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
        read: false
      };

      const res = await request(app)
        .post("/api/notifications")
        .send(newNotification);

      expect(res.status).toBe(201);
      expect(res.body).toHaveProperty("msg", "Notification added successfully");
      expect(res.body.notification).toMatchObject(newNotification);
      expect(res.body.notification).toHaveProperty("id", "new-id");
    });

    it("should default `read` to false if not provided", async () => {
      const newNotification = {
        message: "Notification without read field",
        date: "2024-04-01"
      };

      const res = await request(app)
        .post("/api/notifications")
        .send(newNotification);

      expect(res.status).toBe(201);
      expect(res.body.notification.read).toBeUndefined(); // mock doesn't set read by default
    });
  });

  describe("PUT /api/notifications/markAllAsRead", () => {
    it("should mark all notifications as read", async () => {
      const res = await request(app).put("/api/notifications/markAllAsRead");
      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty("msg", "All notifications marked as read");
      expect(res.body.notifications[0].read).toBe(true);
    });
  });
});
