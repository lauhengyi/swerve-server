export default interface IDatabase {
  create(data: any): Promise<any>;
  findById(id: string): Promise<any>;
  findByIdAndUpdate(id: string): Promise<any>;
  findByIdAndDelete(id: string): Promise<void>;
}
