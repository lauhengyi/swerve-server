import IModel from '../interfaces/IModel';
import QueryFeatures from './utils/queryFeatures';

const queryFactory = (model: IModel) => {
  return async (queryParams: object) => {
    try {
      const queryObj = new QueryFeatures(model.find(), queryParams)
        .filter()
        .sort()
        .paginate()
        .selectFields();
      return await queryObj.query;
    } catch {
      throw new Error('Error querying products');
    }
  };
};

export default queryFactory;
