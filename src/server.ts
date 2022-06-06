import mongoose from 'mongoose';
import dotenv from 'dotenv';
import app from './app';

dotenv.config({ path: './config.env' });

//Connect to database
if (!process.env.DATABASE_URL || !process.env.DATABASE_PASSWORD) {
  console.log('DATABASE_URL or DATABASE_PASSWORD not set');
  process.exit(1);
}

const DB = process.env.DATABASE_URL.replace(
  '<password>',
  process.env.DATABASE_PASSWORD
);

mongoose.connect(DB).then(() => console.log('DB connection successful!'));

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});
