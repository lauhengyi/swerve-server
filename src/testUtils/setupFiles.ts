module.exports = beforeEach(() => {
  // Set environment variables
  process.env.JWT_SECRET = 'secret';
  process.env.JWT_EXPIRES_IN = '900000';

  process.env.RATE_LIMIT_MAX = '100';
  process.env.RATE_LIMIT_WINDOW_MS = '900000';
});
