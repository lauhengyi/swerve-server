import IModel from '../interfaces/IModel';
import MockQuery from './MockQuery';
import { Request } from 'express';
class MockModel implements IModel {
  calls = 0;
  create(payload: Request['body']): Promise<object> {
    this.calls++;
    if (payload?.test === 'error') {
      throw new Error('Test Error for create');
    } else {
      return Promise.resolve(payload);
    }
  }
  find(queryParams: Request['query']): MockQuery {
    this.calls++;
    if (queryParams?.test === 'error') {
      throw new Error('Test Error for find');
    } else {
      return new MockQuery([
        { name: 'Found object 1' },
        { name: 'Found object 2' }
      ]);
    }
  }
  findById(id: string): object {
    this.calls++;
    if (id === 'error') {
      throw new Error('Test Error for findById');
    } else {
      return Promise.resolve({ name: 'Found object' });
    }
  }
  findByIdAndUpdate(id: string, payload: Request['body']): object {
    this.calls++;
    if (id === 'error') {
      throw new Error('Test Error for findByIdAndUpdate');
    } else {
      return Promise.resolve(payload);
    }
  }
  findByIdAndDelete(id: string) {
    this.calls++;
    if (id === 'error') {
      throw new Error('Test Error for findByIdAndDelete');
    } else {
      return;
    }
  }
}

export default MockModel;
