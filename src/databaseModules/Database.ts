import QueryFeatures from './utils/queryFeatures';
import { Model, QueryOptions } from 'mongoose';

export default class Database<X, Y, Z> {
  model: Model<X, Y, Z>;
  constructor(model: Model<X, Y, Z>) {
    this.model = model;
  }

  async create(payload: object) {
    return await this.model.create(payload);
  }

  async findById(id: string) {
    return await this.model.findById(id);
  }

  async findOne(queryParams: QueryOptions) {
    return await this.model.findOne(queryParams);
  }

  async query(queryParams: QueryOptions) {
    const queryObj = new QueryFeatures(this.model.find(), queryParams)
      .filter()
      .sort()
      .paginate()
      .selectFields();
    return await queryObj.query;
  }

  async update(id: string, payload: object) {
    return await this.model.findByIdAndUpdate(id, payload, {
      new: true,
      runValidators: true
    });
  }

  async delete(id: string) {
    return await this.model.findByIdAndDelete(id);
  }
}
