import createFactory from './createFactory';
import findFactory from './findFactory';
import queryFactory from './queryFactory';
import updateFactory from './updateFactory';
import deleteFactory from './deleteFactory';
import IModel from '../interfaces/IModel';

const databaseFactory = (model: IModel) => {
  return {
    create: createFactory(model),
    find: findFactory(model),
    query: queryFactory(model),
    update: updateFactory(model),
    delete: deleteFactory(model)
  };
};

export default databaseFactory;
