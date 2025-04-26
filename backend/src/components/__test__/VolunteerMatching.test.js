// __tests__/VolunteerMatching.test.js
const request = require('supertest');
const express = require('express');

// Create a mini‐app for testing
const app = express();
app.use(express.json());

// Mock the Mongoose model
jest.mock('../models/VolunteerMatching');
const VolunteerMatching = require('../models/VolunteerMatching');

// Mount the router under test
const router = require('../routes/VolunteerMatching');
app.use('/api/volunteer/matching', router);

describe('VolunteerMatching API', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  describe('GET /', () => {
    it('should return 200 and an array of matches', async () => {
      const fakeMatches = [{ volunteerName: 'Alice', matchedEvent: 'Cleanup' }];
      VolunteerMatching.find.mockReturnValue({
        sort: jest.fn().mockResolvedValue(fakeMatches)
      });

      const res = await request(app).get('/api/volunteer/matching');
      expect(res.status).toBe(200);
      expect(res.body).toEqual({ matches: fakeMatches });
      expect(VolunteerMatching.find).toHaveBeenCalled();
    });

    it('should return 500 on error', async () => {
      VolunteerMatching.find.mockImplementation(() => ({
        sort: jest.fn().mockRejectedValue(new Error('DB failure'))
      }));

      const res = await request(app).get('/api/volunteer/matching');
      expect(res.status).toBe(500);
      expect(res.body).toHaveProperty('error', expect.stringContaining('Server error'));
    });
  });

  describe('POST /', () => {
    it('should 400 if missing fields', async () => {
      const res = await request(app)
        .post('/api/volunteer/matching')
        .send({ volunteerName: 'Bob' });
      expect(res.status).toBe(400);
      expect(res.body).toHaveProperty('error', 'Both volunteerName and matchedEvent are required.');
    });

    it('should 201 and return the saved match', async () => {
      const payload = { volunteerName: 'Bob', matchedEvent: 'Food Drive' };
      const saved = { _id: '123', ...payload };
      VolunteerMatching.mockImplementation(() => ({
        save: jest.fn().mockResolvedValue(saved)
      }));

      const res = await request(app)
        .post('/api/volunteer/matching')
        .send(payload);
      expect(res.status).toBe(201);
      expect(res.body).toEqual({ msg: 'Volunteer match record added successfully', match: saved });
    });

    it('should 500 on save error', async () => {
      VolunteerMatching.mockImplementation(() => ({
        save: jest.fn().mockRejectedValue(new Error('DB save error'))
      }));

      const res = await request(app)
        .post('/api/volunteer/matching')
        .send({ volunteerName: 'Bob', matchedEvent: 'Drive' });
      expect(res.status).toBe(500);
      expect(res.body).toHaveProperty('error', expect.stringContaining('Server error'));
    });
  });

  describe('PUT /:id', () => {
    const id = 'abc123';

    it('should 400 if missing fields', async () => {
      const res = await request(app)
        .put(`/api/volunteer/matching/${id}`)
        .send({ volunteerName: 'Charlie' });
      expect(res.status).toBe(400);
      expect(res.body.error).toMatch(/Both volunteerName and matchedEvent are required/);
    });

    it('should 404 if no document found', async () => {
      VolunteerMatching.findByIdAndUpdate.mockResolvedValue(null);

      const res = await request(app)
        .put(`/api/volunteer/matching/${id}`)
        .send({ volunteerName: 'Charlie', matchedEvent: 'Park Clean' });
      expect(res.status).toBe(404);
      expect(res.body.error).toBe('Volunteer match record not found');
    });

    it('should 200 and return updated match', async () => {
      const updated = { _id: id, volunteerName: 'Charlie', matchedEvent: 'Park Clean' };
      VolunteerMatching.findByIdAndUpdate.mockResolvedValue(updated);

      const res = await request(app)
        .put(`/api/volunteer/matching/${id}`)
        .send({ volunteerName: 'Charlie', matchedEvent: 'Park Clean' });
      expect(res.status).toBe(200);
      expect(res.body).toEqual({ msg: 'Volunteer match record updated', match: updated });
    });

    it('should 500 on update error', async () => {
      VolunteerMatching.findByIdAndUpdate.mockRejectedValue(new Error('DB update fail'));

      const res = await request(app)
        .put(`/api/volunteer/matching/${id}`)
        .send({ volunteerName: 'Charlie', matchedEvent: 'Park Clean' });
      expect(res.status).toBe(500);
      expect(res.body.error).toMatch(/Server error while updating/);
    });
  });

  describe('DELETE /:id', () => {
    const id = 'deleteId';

    it('should 404 if not found', async () => {
      VolunteerMatching.findByIdAndDelete.mockResolvedValue(null);

      const res = await request(app).delete(`/api/volunteer/matching/${id}`);
      expect(res.status).toBe(404);
      expect(res.body.error).toBe('Volunteer match record not found');
    });

    it('should 200 on successful delete', async () => {
      VolunteerMatching.findByIdAndDelete.mockResolvedValue({ _id: id });

      const res = await request(app).delete(`/api/volunteer/matching/${id}`);
      expect(res.status).toBe(200);
      expect(res.body).toEqual({ msg: 'Volunteer match record deleted successfully' });
    });

    it('should 500 on delete error', async () => {
      VolunteerMatching.findByIdAndDelete.mockRejectedValue(new Error('DB delete error'));

      const res = await request(app).delete(`/api/volunteer/matching/${id}`);
      expect(res.status).toBe(500);
      expect(res.body.error).toMatch(/Server error while deleting/);
    });
  });
});
