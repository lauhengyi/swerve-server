export default interface IDatabase {
  create(data: object): Promise<object>;
  find(id: string): Promise<object>;
  query(query: object): Promise<object[]>;
  update(id: string, payload: object): Promise<object>;
  delete(id: string): Promise<void>;
}
