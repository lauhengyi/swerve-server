import IQuery from '../interfaces/IQuery';

class mockQuery extends Promise<any> implements IQuery {
  calls: number = 0;
  constructor(
    executor: (
      resolve: (value: unknown) => void,
      reject: (reason?: any) => void
    ) => void
  ) {
    super(executor);
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
