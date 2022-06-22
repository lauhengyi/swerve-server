import IModel from '../interfaces/IModel';
import MockQuery from './MockQuery';
import { Request } from 'express';
class MockModel implements IModel {
  calls = 0;

  create(payload: Request['body']) {
    this.calls++;
    if (payload?.test === 'error') {
      return Promise.reject(new Error('Test Error for create'));
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
      return Promise.reject(new Error('CastError'));
    } else if (id === 'notFound') {
      return Promise.resolve(null);
    } else {
      return Promise.resolve({ name: 'Found object' });
    }
  }

  findByIdAndUpdate(id: string, payload: Request['body']) {
    this.calls++;
    if (id === 'invalidId') {
      return Promise.reject(new Error('CastError'));
    } else if (id === 'notFound') {
      return Promise.resolve(null);
    } else {
      return Promise.resolve(payload);
    }
  }

  findByIdAndDelete(id: string) {
    this.calls++;
    if (id === 'invalidId') {
      return Promise.reject(new Error('CastError'));
    } else if (id === 'notFound') {
      return Promise.resolve(null);
    } else {
      return Promise.resolve({ name: 'Found object and deleted' });
    }
  }
}

export default MockModel;
