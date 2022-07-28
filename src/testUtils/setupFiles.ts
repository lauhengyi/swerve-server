module.exports = beforeEach(() => {
  // Set environment variables
  process.env.JWT_SECRET = 'secret';
  process.env.JWT_EXPIRES_IN = '15min';
});
