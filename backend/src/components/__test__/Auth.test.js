// Auth.test.js

const request = require("supertest");
const express = require("express");
// Note: dont reimport mongoose here since our global setup handles the connection

describe("Auth API", () => {
  let app;
  let authRouter;

  beforeEach(() => {
    // Removed jest.resetModules() to preserve the existing Mongoose connection
    authRouter = require("../Routes/Auth"); // adjust the path if necessary
    app = express();
    app.use(express.json());
    app.use("/api/auth", authRouter);
  });

  describe("POST /api/auth/register", () => {
    it("should register a new user with valid input", async () => {
      process.env.JWT_SECRET = "testsecret";
      const payload = { email: "test@example.com", password: "password123", role: "volunteer" };
      const res = await request(app).post("/api/auth/register").send(payload);
      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty("msg", "User registered successfully");
    });

    it("should return 400 when email is missing", async () => {
      const res = await request(app).post("/api/auth/register").send({ password: "password123", role: "volunteer" });
      expect(res.status).toBe(400);
      expect(res.body).toHaveProperty("msg", "Email and password are required");
    });

    it("should return 400 when password is missing", async () => {
      const res = await request(app).post("/api/auth/register").send({ email: "test@example.com", role: "volunteer" });
      expect(res.status).toBe(400);
      expect(res.body).toHaveProperty("msg", "Email and password are required");
    });

    it("should return 400 when password is too short", async () => {
      const res = await request(app)
        .post("/api/auth/register")
        .send({ email: "test@example.com", password: "12345", role: "volunteer" });
      expect(res.status).toBe(400);
      expect(res.body).toHaveProperty("msg", "Password must be at least 6 characters long");
    });

    it("should return 400 if email already exists", async () => {
      const payload = { email: "test@example.com", password: "password123", role: "volunteer" };
      // 1st registration should succeed.
      await request(app).post("/api/auth/register").send(payload);
      // 2nd registration with the same email should fail.
      const res = await request(app).post("/api/auth/register").send(payload);
      expect(res.status).toBe(400);
      expect(res.body).toHaveProperty("msg", "User already exists");
    });
  });

  describe("POST /api/auth/login", () => {
    beforeEach(async () => {
      await request(app)
        .post("/api/auth/register")
        .send({ email: "login@test.com", password: "password123", role: "volunteer" });
    });

    it("should login with valid credentials", async () => {
      const res = await request(app)
        .post("/api/auth/login")
        .send({ email: "login@test.com", password: "password123" });
      expect(res.status).toBe(200);
      // instead of checking for dummy-token, check that token exists and is a string
      expect(typeof res.body.token).toBe("string");
      expect(res.body.token.length).toBeGreaterThan(0);
      expect(res.body.user).toHaveProperty("email", "login@test.com");
      expect(res.body.user).toHaveProperty("id");
    });

    it("should return 400 when email or password is missing", async () => {
      const res = await request(app)
        .post("/api/auth/login")
        .send({ email: "login@test.com" });
      expect(res.status).toBe(400);
      expect(res.body).toHaveProperty("msg", "Email and password are required");
    });

    it("should return 400 with invalid credentials", async () => {
      const res = await request(app)
        .post("/api/auth/login")
        .send({ email: "login@test.com", password: "wrongpassword" });
      expect(res.status).toBe(400);
      expect(res.body).toHaveProperty("msg", "Invalid credentials");
    });
  });
});
