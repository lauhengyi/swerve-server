export default interface IQuery {
  find(filterObj: object): IQuery;
  sort(sortObj: string): IQuery;
  skip(skip: number): IQuery;
  limit(limit: number): IQuery;
  select(selectObj: string): IQuery;
  then(callback: (payload: object[]) => void): void;
}
