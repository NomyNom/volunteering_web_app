// Auth.test.js

const request = require("supertest");
const express = require("express");

describe("Auth API", () => {
  let app;
  let authRouter;

  // reset modules before each test to clear dummyUsers and get a fresh router instance
  beforeEach(() => {
    jest.resetModules();
    // import a fresh instance of the router
    authRouter = require("./Auth"); // adjust the path if necessary
    app = express();
    app.use(express.json());
    app.use("/api/auth", authRouter);
  });

  describe("POST /api/auth/register", () => {
    it("should register a new user with valid input", async () => {
      const payload = {
        email: "test@example.com",
        password: "password123",
        role: "volunteer"
      };

      const res = await request(app)
        .post("/api/auth/register")
        .send(payload);

      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty("msg", "User registered successfully (dummy)");
    });

    it("should return 400 when email is missing", async () => {
      const payload = {
        password: "password123",
        role: "volunteer"
      };

      const res = await request(app)
        .post("/api/auth/register")
        .send(payload);

      expect(res.status).toBe(400);
      expect(res.body).toHaveProperty("msg", "Email and password are required");
    });

    it("should return 400 when password is missing", async () => {
      const payload = {
        email: "test@example.com",
        role: "volunteer"
      };

      const res = await request(app)
        .post("/api/auth/register")
        .send(payload);

      expect(res.status).toBe(400);
      expect(res.body).toHaveProperty("msg", "Email and password are required");
    });

    it("should return 400 when password is less than 6 characters", async () => {
      const payload = {
        email: "test@example.com",
        password: "12345",
        role: "volunteer"
      };

      const res = await request(app)
        .post("/api/auth/register")
        .send(payload);

      expect(res.status).toBe(400);
      expect(res.body).toHaveProperty("msg", "Password must be at least 6 characters long");
    });

    it("should return 400 if user already exists", async () => {
      const payload = {
        email: "test@example.com",
        password: "password123",
        role: "volunteer"
      };

      // 1st registration should succeed.
      await request(app)
        .post("/api/auth/register")
        .send(payload);
      
      // 2nd registration w/ same email should fail
      const res = await request(app)
        .post("/api/auth/register")
        .send(payload);

      expect(res.status).toBe(400);
      expect(res.body).toHaveProperty("msg", "User already exists");
    });
  });

  describe("POST /api/auth/login", () => {
    // register a user before running login tests
    beforeEach(async () => {
      const payload = {
        email: "test@example.com",
        password: "password123",
        role: "volunteer"
      };
      await request(app)
        .post("/api/auth/register")
        .send(payload);
    });

    it("should login with valid credentials", async () => {
      const payload = {
        email: "test@example.com",
        password: "password123"
      };

      const res = await request(app)
        .post("/api/auth/login")
        .send(payload);

      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty("token", "dummy-token");
      expect(res.body).toHaveProperty("user");
      expect(res.body.user).toHaveProperty("email", "test@example.com");
    });

    it("should return 400 when email or password is missing", async () => {
      const payload = {
        email: "test@example.com"
        // pw missing
      };

      const res = await request(app)
        .post("/api/auth/login")
        .send(payload);

      expect(res.status).toBe(400);
      expect(res.body).toHaveProperty("msg", "Email and password are required");
    });

    it("should return 400 with invalid credentials", async () => {
      const payload = {
        email: "test@example.com",
        password: "wrongpassword"
      };

      const res = await request(app)
        .post("/api/auth/login")
        .send(payload);

      expect(res.status).toBe(400);
      expect(res.body).toHaveProperty("msg", "Invalid credentials");
    });
  });
});
