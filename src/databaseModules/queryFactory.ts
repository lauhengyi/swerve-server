import IModel from '../interfaces/IModel';
import QueryFeatures from './utils/queryFeatures';

const queryFactory = (model: IModel) => {
  return async (queryParams: object) => {
    const queryObj = new QueryFeatures(model.find(), queryParams)
      .filter()
      .sort()
      .paginate()
      .selectFields();
    return await queryObj.query;
  };
};

export default queryFactory;
