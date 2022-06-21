import express from 'express';
import ICollection from './interfaces/ICollection';
import productRoutes from './routes/productRoutes';

const makeApp = (collection: ICollection) => {
  const app = express();

  // Parses incoming requests with JSON payloads.
  // The new body object will be empty if the request body is not JSON.
  app.use(express.json());

  // Routes
  const apiString = '/api/v1';
  app.use(`${apiString}/products`, productRoutes(collection.products));

  return app;
};
export default makeApp;
