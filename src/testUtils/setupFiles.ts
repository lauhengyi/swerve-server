module.exports = afterEach(() => {
  // Set environment variables
  process.env.JWT_SECRET = 'secret';
  process.env.JWT_EXPIRES_IN = '15min';
});
