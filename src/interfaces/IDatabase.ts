export default interface IDatabase {
  create(data: any): Promise<any>;
  findById(id: string): Promise<any>;
  findByIdAndUpdate(id: string, payload: any): Promise<any>;
  findByIdAndDelete(id: string): Promise<void>;
}
