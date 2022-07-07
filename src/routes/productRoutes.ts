import express from 'express';
import productController from '../controllers/productController';

// eslint-disable-next-line new-cap
const router = express.Router();

router
  .route('/')
  .get(productController.queryAllProducts)
  .post(productController.createProduct);

router
  .route('/:id')
  .get(productController.getProductById)
  .patch(productController.updateProduct)
  .delete(productController.deleteProduct);

export default router;
