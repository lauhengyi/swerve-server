import IDatabase from '../interfaces/IDatabase';
import QueryFeatures from './utils/queryFeatures';

const queryFactory = (database: IDatabase) => {
  return async (queryParams: object) => {
    try {
      const queryObj = new QueryFeatures(database.find(), queryParams)
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
