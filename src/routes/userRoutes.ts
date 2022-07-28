import express from 'express';
import authController from '../controllers/authController';
import userController from '../controllers/userController';

// eslint-disable-next-line new-cap
const router = express.Router();

router.route('/signup').post(authController.signUp);
router.route('/login').get(authController.logIn);

router
  .route('/updateMyPassword')
  .patch(authController.protect, authController.updateMyPassword);

router
  .route('/deleteMe')
  .delete(authController.protect, userController.deleteMe);

// router
//   .route('/')
//   .get(productController.queryAllProducts)
//   .post(productController.createProduct);

// router
//   .route('/:id')
//   .get(productController.getProductById)
//   .patch(productController.updateProduct)
//   .delete(productController.deleteProduct);

export default router;
