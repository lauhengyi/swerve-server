import express from 'express';

const app = express();

// Parses incoming requests with JSON payloads.
// The new body object will be empty if the request body is not JSON.
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello World!');
});

export default app;
