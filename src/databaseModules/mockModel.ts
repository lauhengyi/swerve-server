import IDatabase from '../interfaces/IDatabase';
import mockQuery from './mockQuery';
class mockModel implements IDatabase {
  calls = 0;
  create(payload: any): mockQuery {
    this.calls++;
    return new mockQuery((resolve, reject) => {
      resolve(payload);
    });
  }
  find(query: any): mockQuery {
    this.calls++;
    return new mockQuery((resolve, reject) => {
      resolve({ name: 'Found object' });
    });
  }
  findById(id: string): mockQuery {
    this.calls++;
    return new mockQuery((resolve, reject) => {
      resolve({ name: 'Found object' });
    });
  }
  findByIdAndUpdate(id: string, payload: any): mockQuery {
    this.calls++;
    return new mockQuery((resolve, reject) => {
      resolve(payload);
    });
  }
  findByIdAndDelete(id: string): mockQuery {
    this.calls++;
    return new mockQuery((resolve, reject) => {
      resolve({ name: 'Found object and deleted' });
    });
  }
}

export default mockModel;
