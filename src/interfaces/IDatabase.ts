export default interface IDatabase {
  create(data: any): Promise<any>;
}
