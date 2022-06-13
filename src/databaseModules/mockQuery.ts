/* eslint-disable @typescript-eslint/no-unused-vars */
// Unused vars will exist on this object as it is a mock object;
import IQuery from '../interfaces/IQuery';

class MockQuery implements IQuery {
  payload;
  calls = 0;
  constructor(payload: object) {
    this.payload = payload;
  }
  find(filterObj: object): IQuery {
    this.calls++;
    return this;
  }

  sort(sortObj: string): IQuery {
    this.calls++;
    return this;
  }

  skip(skip: number): IQuery {
    this.calls++;
    return this;
  }

  limit(limit: number): IQuery {
    this.calls++;
    return this;
  }

  select(selectObj: string): IQuery {
    this.calls++;
    return this;
  }
  then(callback: (payload: object) => void): void {
    callback(this.payload);
  }
}

export default MockQuery;
