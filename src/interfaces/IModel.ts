import IQuery from './IQuery';
export default interface IModel {
  create(data: object): Promise<object>;
  find(query?: object): IQuery;
  findById(id: string): object;
  findByIdAndUpdate(id: string, payload: object, options?: object): object;
  findByIdAndDelete(id: string): object;
}
