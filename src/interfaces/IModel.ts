import IQuery from './IQuery';
export default interface IModel {
  create(data: object): IQuery;
  find(query?: object): IQuery;
  findById(id: string): IQuery;
  findByIdAndUpdate(id: string, payload: object, options?: object): IQuery;
  findByIdAndDelete(id: string): void;
}
