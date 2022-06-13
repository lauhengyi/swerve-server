/* eslint-disable @typescript-eslint/no-unused-vars */
// Unused vars will exist on this object as it is a mock object;
import IModel from '../interfaces/IModel';
import MockQuery from './MockQuery';
class MockModel implements IModel {
  calls = 0;
  create(payload: object): MockQuery {
    this.calls++;
    return new MockQuery(payload);
  }
  find(query: object): MockQuery {
    this.calls++;
    return new MockQuery({ name: 'Found object' });
  }
  findById(id: string): MockQuery {
    this.calls++;
    return new MockQuery({ name: 'Found object' });
  }
  findByIdAndUpdate(id: string, payload: object): MockQuery {
    this.calls++;
    return new MockQuery(payload);
  }
  findByIdAndDelete(id: string): MockQuery {
    this.calls++;
    return new MockQuery({ name: 'Found object and deleted' });
  }
}

export default MockModel;
