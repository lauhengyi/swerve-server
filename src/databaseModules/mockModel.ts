import IModel from '../interfaces/IModel';
import MockQuery from './MockQuery';
import mongoose from 'mongoose';
import MongoServerError from './MongoServerError';
import { Request } from 'express';
class MockModel implements IModel {
  calls = 0;

  create(payload: Request['body']) {
    this.calls++;
    if (payload?.test === 'error') {
      return Promise.reject(new mongoose.Error.ValidationError());
    } else if (payload?.test === 'duplicateField') {
      return Promise.reject(
        new MongoServerError(
          'E11000 duplicate key error collection: test.products index: username_1 dup key: { username: "SpicyMeatball" }',
          11000
        )
      );
    } else {
      return Promise.resolve(payload);
    }
  }

  find(): MockQuery {
    this.calls++;
    return new MockQuery([
      { name: 'Found object 1' },
      { name: 'Found object 2' }
    ]);
  }

  findById(id: string) {
    this.calls++;
    if (id === 'invalidId') {
      return Promise.reject(
        new mongoose.Error.CastError('CastError', 'invalidId', '_id')
      );
    } else if (id === 'notFound') {
      return Promise.resolve(null);
    } else {
      return Promise.resolve({ name: 'Found object' });
    }
  }

  findByIdAndUpdate(id: string, payload: Request['body']) {
    this.calls++;
    if (id === 'invalidId') {
      return Promise.reject(
        new mongoose.Error.CastError('CastError', 'invalidId', '_id')
      );
    } else if (id === 'notFound') {
      return Promise.resolve(null);
    } else if (payload?.test === 'error') {
      return Promise.reject(new mongoose.Error.ValidationError());
    } else if (payload?.test === 'duplicateField') {
      return Promise.reject(
        new MongoServerError(
          'E11000 duplicate key error collection: test.products index: username_1 dup key: { username: "SpicyMeatball" }',
          11000
        )
      );
    } else {
      return Promise.resolve(payload);
    }
  }

  findByIdAndDelete(id: string) {
    this.calls++;
    if (id === 'invalidId') {
      return Promise.reject(
        new mongoose.Error.CastError('CastError', 'invalidId', '_id')
      );
    } else if (id === 'notFound') {
      return Promise.resolve(null);
    } else {
      return Promise.resolve({ name: 'Found object and deleted' });
    }
  }
}

export default MockModel;
