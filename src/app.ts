import express from 'express';
import errorController from './controllers/errorController';
import AppError from './utils/AppError';
import productRoutes from './routes/productRoutes';

const app = express();

// Parses incoming requests with JSON payloads.
// The new body object will be empty if the request body is not JSON.
app.use(express.json());

// Routes
const apiString = '/api/v1';
app.use(`${apiString}/products`, productRoutes);

// Catch all unhandled requests and return 404
app.all('*', (req, res, next) => {
  const message = `Connot find ${req.originalUrl} on this server.`;
  next(new AppError(message, 404));
});

app.use(errorController);

export default app;
