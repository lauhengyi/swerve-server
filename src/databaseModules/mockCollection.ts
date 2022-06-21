import databaseFactory from './databaseFactory';
import ICollection from '../interfaces/ICollection';
import MockModel from './MockModel';

const mockCollection: ICollection = {
  products: databaseFactory(new MockModel())
};

export default mockCollection;
