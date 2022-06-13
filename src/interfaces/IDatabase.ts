import IQuery from './IQuery';
export default interface IDatabase {
  create(data: object): IQuery;
  find(query?: object): IQuery;
  findById(id: string): IQuery;
  findByIdAndUpdate(id: string, payload: object, options?: object): IQuery;
  findByIdAndDelete(id: string): IQuery;
}
