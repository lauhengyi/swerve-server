import getFilterObj from './getFilterObj';
import formatProperties from './formatProperties';
import { QueryOptions, Query } from 'mongoose';

class QueryFeatures<T> {
  query: Query<T[], T>;
  queryParams: QueryOptions;

  constructor(query: Query<T[], T>, queryParams: QueryOptions) {
    this.query = query;
    this.queryParams = queryParams;
  }

  filter() {
    const filterObj = getFilterObj(this.queryParams);
    this.query = this.query.find(filterObj);
    return this;
  }

  sort() {
    if (this.queryParams.sort) {
      const sortString = formatProperties(this.queryParams.sort);
      this.query = this.query.sort(sortString);
    }
    return this;
  }

  selectFields() {
    if (this.queryParams.fields) {
      const selectString = formatProperties(this.queryParams.fields);
      this.query = this.query.select(selectString);
    } else {
      this.query = this.query.select('-__v');
    }
    return this;
  }

  paginate() {
    const page: number = this.queryParams.page ? this.queryParams.page * 1 : 1;

    const limit: number = this.queryParams.limit
      ? this.queryParams.limit * 1
      : 100;

    const skip = (page - 1) * limit;

    this.query = this.query.skip(skip).limit(limit);

    return this;
  }
}

export default QueryFeatures;
