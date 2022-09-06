import app from '../../app';
import request from 'supertest';

describe('Rate limiting of endpoints', () => {
  describe('When given less than the rate limit max amount of requests by the same ip', () => {
    it('It should let the request through', async () => {
      const response = await request(app).get('/api');

      expect(response.status).toBe(404);
      expect(response.body).toEqual({
        status: 'fail',
        message: 'Cannot find /api on this server.',
      });
    });

    it('It should have the the headers X-RateLimit-Limit, X-RateLimit-Remaining and X-RateLimit-Reset with the approprate values', async () => {
      const response = await request(app).get('/api');

      expect(response.headers['x-ratelimit-limit']).toBe('100');
      expect(parseInt(response.headers['x-ratelimit-remaining'])).toBeLessThan(
        100,
      );
      expect(response.headers['x-ratelimit-reset']).toBeDefined();
    });
  });
});
