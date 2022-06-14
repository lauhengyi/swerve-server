import IModel from '../interfaces/IModel';
import MockQuery from './MockQuery';
import { Request } from 'express';
class MockModel implements IModel {
  calls = 0;
  create(payload: Request['body']): MockQuery {
    this.calls++;
    if (payload?.test === 'error') {
      throw new Error('Test Error for create');
    } else {
      return new MockQuery(payload);
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
  findById(id: string): MockQuery {
    this.calls++;
    if (id === 'error') {
      throw new Error('Test Error for findById');
    } else {
      return new MockQuery({ name: 'Found object' });
    }
  }
  findByIdAndUpdate(id: string, payload: Request['body']): MockQuery {
    this.calls++;
    if (id === 'error') {
      throw new Error('Test Error for findByIdAndUpdate');
    } else {
      return new MockQuery(payload);
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
