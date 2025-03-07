// backend/__tests__/volunteerMatching.test.js
const request = require('supertest');
const express = require('express');
// Adjust the path if your folder name is "routes" (all lowercase)
const volunteerMatchingRouter = require('../Routes/VolunteerMatching');

const app = express();
app.use(express.json());
// Mount the router at the proper endpoint; the route file defines GET and POST on '/'
app.use('/api/volunteer/matching', volunteerMatchingRouter);

describe('VolunteerMatching API', () => {
  test('GET /api/volunteer/matching should return dummy volunteer matches', async () => {
    const res = await request(app).get('/api/volunteer/matching');
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('matches');
    expect(Array.isArray(res.body.matches)).toBe(true);
    // Initially, there should be at least 3 records.
    expect(res.body.matches.length).toBeGreaterThanOrEqual(3);
    // Check that one of the dummy records is present.
    expect(res.body.matches[0]).toHaveProperty('volunteerName', 'Alice Johnson');
  });

  test('POST /api/volunteer/matching should add a new volunteer match record', async () => {
    const newMatch = {
      volunteerName: 'David Lee',
      matchedEvent: 'Tree Planting'
    };

    const res = await request(app)
      .post('/api/volunteer/matching')
      .send(newMatch);

    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('msg', 'Volunteer match record added (stub)');
    expect(res.body).toHaveProperty('match');
    expect(res.body.match).toHaveProperty('volunteerName', newMatch.volunteerName);
    expect(res.body.match).toHaveProperty('matchedEvent', newMatch.matchedEvent);
    expect(res.body.match).toHaveProperty('id');
  });
});
