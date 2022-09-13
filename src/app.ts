import express from 'express';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import expressMongoSanitize from 'express-mongo-sanitize';
import { xss } from 'express-xss-sanitizer';
import hpp from 'hpp';

import errorController from './controllers/errorController';
import AppError from './utils/AppError';
import productRoutes from './routes/productRoutes';
import userRoutes from './routes/userRoutes';

const app = express();

// Add http security headers
app.use(helmet());

// Rate limiting middleware to prevent brute force and DDOS attacks
// 100 request per ip per 15 minutes
app.use(
  '/api',
  rateLimit({
    max: 100,
    windowMs: 900000,
    message: 'Too many requests from this IP, please try again later.',
  }),
);

// Parses incoming requests with JSON payloads.
// The new body object will be empty if the request body is not JSON.
app.use(express.json({ limit: '10kb' }));

// Data sanitization against NoSQL query injection
app.use(expressMongoSanitize());

// Data sanitization against XSS
app.use(xss());

// Prevents parameter pollution
app.use(hpp());

// Routes
const apiString = '/api/v1';
app.use(`${apiString}/users`, userRoutes);
app.use(`${apiString}/products`, productRoutes);

// Catch all unhandled requests and return 404
app.all('*', (req, res, next) => {
  const message = `Cannot find ${req.originalUrl} on this server.`;
  next(new AppError(message, 404));
});

app.use(errorController);

export default app;
