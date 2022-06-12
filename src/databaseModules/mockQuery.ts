import IQuery from '../interfaces/IQuery';

class mockQuery implements IQuery {
  promise;
  calls = 0;
  constructor(payload: object) {
    this.promise = Promise.resolve(payload);
  }
  find(filterObj: any): IQuery {
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
}

export default mockQuery;
