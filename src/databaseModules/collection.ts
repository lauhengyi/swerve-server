import ICollection from '../interfaces/ICollection';
import databaseFactory from './databaseFactory';
import Product from '../models/productModel';

const collection: ICollection = {
  products: databaseFactory(Product)
};

export default collection;
