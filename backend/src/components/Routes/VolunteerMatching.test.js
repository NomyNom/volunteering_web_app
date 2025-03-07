// backend/__tests__/volunteerMatching.test.js
const request = require('supertest');
const express = require('express');
const volunteerMatchingRouter = require('./VolunteerMatching');

// Create a simple Express app and mount the router.
const app = express();
// The route file defines GET '/matching', so mount it at an appropriate path.
app.use('/api/volunteers', volunteerMatchingRouter);

describe('GET /api/volunteers/matching', () => {
  it('should return dummy volunteer matches', async () => {
    const response = await request(app).get('/api/volunteers/matching');
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('matches');
    expect(Array.isArray(response.body.matches)).toBe(true);
    expect(response.body.matches.length).toBe(3);
    // Optionally, check the first match object.
    expect(response.body.matches[0]).toMatchObject({
      volunteerName: 'Alice Johnson',
      matchedEvent: 'Community Clean-Up'
    });
  });
});
