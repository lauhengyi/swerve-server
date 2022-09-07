import request from 'supertest';
import app from '../../app';

describe('Security Http Headers', () => {
  describe('When given any request', () => {
    it('Should have a bunch of security headers', async () => {
      const response = await request(app).get('/api');

      expect(response.headers['content-security-policy']).toBe(
        "default-src 'self';base-uri 'self';font-src 'self' https: data:;form-action 'self';frame-ancestors 'self';img-src 'self' data:;object-src 'none';script-src 'self';script-src-attr 'none';style-src 'self' https: 'unsafe-inline';upgrade-insecure-requests",
      );
      expect(response.headers['cross-origin-embedder-policy']).toBe(
        'require-corp',
      );
      expect(response.headers['cross-origin-opener-policy']).toBe(
        'same-origin',
      );
      expect(response.headers['cross-origin-resource-policy']).toBe(
        'same-origin',
      );
      expect(response.header['origin-agent-cluster']).toBe('?1');
      expect(response.header['referrer-policy']).toBe('no-referrer');
      expect(response.headers['strict-transport-security']).toBe(
        'max-age=15552000; includeSubDomains',
      );
      expect(response.headers['x-content-type-options']).toBe('nosniff');
      expect(response.headers['x-dns-prefetch-control']).toBe('off');
      expect(response.headers['x-download-options']).toBe('noopen');
      expect(response.headers['x-frame-options']).toBe('SAMEORIGIN');
      expect(response.headers['x-permitted-cross-domain-policies']).toBe(
        'none',
      );
      expect(response.headers['x-xss-protection']).toBe('0');
    });
  });
});
