export default interface IDatabase {
  create(data: object): Promise<object>;
  find(id: string): Promise<object | null>;
  query(query: object): Promise<object[]>;
  update(id: string, payload: object): Promise<object | null>;
  delete(id: string): Promise<object | null>;
}
