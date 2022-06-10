import IQuery from '../../interfaces/IQuery';
import getFilterObj from './getFilterObj';
import formatProperties from './formatProperties';

class QueryFeatures {
  query: IQuery;
  queryParams: any;

  constructor(query: IQuery, queryParams: any) {
    this.query = query;
    this.queryParams = queryParams;
  }

  filter() {
    const filterObj = getFilterObj(this.queryParams);
    this.query.find(filterObj);
    return this;
  }
}

export default QueryFeatures;
