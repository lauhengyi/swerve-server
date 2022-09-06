import mongoose from 'mongoose';
import dotenv from 'dotenv';
import app from './app';

// Catch uncaught exceptions
process.on('uncaughtException', (err) => {
  console.log('UNCAUGHT EXCEPTION 💥', err);
  console.log('Closing server...');
  process.exit(1);
});

// Load environment variables from .env file
dotenv.config();

// Connect to database
if (!process.env.DATABASE_URL || !process.env.DATABASE_PASSWORD) {
  console.log('DATABASE_URL or DATABASE_PASSWORD not set');
  process.exit(1);
}
const DB = process.env.DATABASE_URL.replace(
  '<password>',
  process.env.DATABASE_PASSWORD,
);
mongoose.connect(DB).then(() => console.log('DB connection successful!'));

// Start server
const port = process.env.PORT || 3000;
const server = app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
  console.log('UNHANDLED PROMISE REJECTION 💥', err);
  console.log('Closing server...');
  server.close(() => {
    console.log('Server closed');
    process.exit(1);
  });
});
