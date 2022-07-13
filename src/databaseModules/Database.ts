import QueryFeatures from './utils/queryFeatures';
import { Model } from 'mongoose';

export default class Database<T> {
  model: Model<T>;
  constructor(model: Model<T>) {
    this.model = model;
  }

  async create(payload: object) {
    return await this.model.create(payload);
  }

  async findById(id: string) {
    return await this.model.findById(id);
  }

  async query(queryParams: object) {
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
