export default interface IDatabase {
  create(data: any): Promise<any>;
  findById(id: string): Promise<any>;
}
