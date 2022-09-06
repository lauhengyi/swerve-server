import rateLimit from 'express-rate-limit';
import AppError from './AppError';

const rateLimiter = () => {
  if (!process.env.RATE_LIMIT_MAX || !process.env.RATE_LIMIT_WINDOW_MS) {
    throw new AppError(
      'RATE_LIMIT_MAX and RATE_LIMIT_WINDOW_MS environment variables must be set.',
      500,
    );
  }
  const limiter = rateLimit({
    max: Number(process.env.RATE_LIMIT_MAX),
    windowMs: Number(process.env.RATE_LIMIT_WINDOW_MS),
    message: 'Too many requests, please try again later.',
  });

  return limiter;
};

export default rateLimiter;
