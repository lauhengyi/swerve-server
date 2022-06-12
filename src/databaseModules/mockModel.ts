/* eslint-disable @typescript-eslint/no-unused-vars */
import IDatabase from '../interfaces/IDatabase';
import mockQuery from './mockQuery';
class mockModel implements IDatabase {
  calls = 0;
  create(payload: object): mockQuery {
    this.calls++;
    return new mockQuery((resolve) => {
      resolve(payload);
    });
  }
  find(query: object): mockQuery {
    this.calls++;
    return new mockQuery((resolve) => {
      resolve({ name: 'Found object' });
    });
  }
  findById(id: string): mockQuery {
    this.calls++;
    return new mockQuery((resolve) => {
      resolve({ name: 'Found object' });
    });
  }
  findByIdAndUpdate(id: string, payload: object): mockQuery {
    this.calls++;
    return new mockQuery((resolve) => {
      resolve(payload);
    });
  }
  findByIdAndDelete(id: string): mockQuery {
    this.calls++;
    return new mockQuery((resolve) => {
      resolve({ name: 'Found object and deleted' });
    });
  }
}

export default mockModel;
