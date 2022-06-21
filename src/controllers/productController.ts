import Product from '../models/productModel';
import controllerFactory from './controllerFactory';
import databaseFactory from '../databaseModules/databaseFactory';

const database = databaseFactory(Product);

const createProduct = controllerFactory.createOneFactory(database);

const getProduct = controllerFactory.getOneFactory(database);

const queryProduct = controllerFactory.queryAllFactory(database);

const updateProduct = controllerFactory.updateOneFactory(database);

const deleteProduct = controllerFactory.deleteOneFactory(database);

export default {
  createProduct,
  getProduct,
  queryProduct,
  updateProduct,
  deleteProduct
};
