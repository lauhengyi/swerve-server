import express from 'express';
import IDatabase from '../interfaces/IDatabase';
import controllerFactory from '../controllers/controllerFactory';

// eslint-disable-next-line new-cap
const productRoutes = (database: IDatabase): express.Router => {
  // eslint-disable-next-line new-cap
  const router = express.Router();

  router
    .route('/')
    .get(controllerFactory.queryAllFactory(database))
    .post(controllerFactory.createOneFactory(database));

  router
    .route('/:id')
    .get(controllerFactory.getOneFactory(database))
    .patch(controllerFactory.updateOneFactory(database))
    .delete(controllerFactory.deleteOneFactory(database));

  return router;
};

export default productRoutes;
