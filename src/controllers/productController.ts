import controllerFactory from './controllerFactory';
import Product from '../models/productModel';
import Database from '../databaseModules/Database';

const productDatabase = new Database(Product);

const createProduct = controllerFactory.createOneFactory(productDatabase);

const getProductById = controllerFactory.getOneFactory(productDatabase);

const queryAllProducts = controllerFactory.queryAllFactory(productDatabase);

const updateProduct = controllerFactory.updateOneFactory(productDatabase);

const deleteProduct = controllerFactory.deleteOneFactory(productDatabase);

export default {
  createProduct,
  getProductById,
  queryAllProducts,
  updateProduct,
  deleteProduct
};
