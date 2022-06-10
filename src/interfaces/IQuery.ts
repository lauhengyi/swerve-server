export default interface IQuery extends Promise<any> {
  find(filterObj: any): IQuery;
  sort(sortObj: string): IQuery;
  skip(skip: number): IQuery;
  limit(limit: number): IQuery;
  select(selectObj: string): IQuery;
}
