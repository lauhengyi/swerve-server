/* eslint-disable @typescript-eslint/no-unused-vars */
// Unused vars will exist on this object as it is a mock object;
import IModel from '../interfaces/IModel';
import mockQuery from './mockQuery';
class mockModel implements IModel {
  calls = 0;
  create(payload: object): mockQuery {
    this.calls++;
    return new mockQuery(payload);
  }
  find(query: object): mockQuery {
    this.calls++;
    return new mockQuery({ name: 'Found object' });
  }
  findById(id: string): mockQuery {
    this.calls++;
    return new mockQuery({ name: 'Found object' });
  }
  findByIdAndUpdate(id: string, payload: object): mockQuery {
    this.calls++;
    return new mockQuery(payload);
  }
  findByIdAndDelete(id: string): mockQuery {
    this.calls++;
    return new mockQuery({ name: 'Found object and deleted' });
  }
}

export default mockModel;
