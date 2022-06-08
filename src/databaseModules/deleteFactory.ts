import IDatabase from '../interfaces/Idatabase';

// Payload is set as any as mongoose can deal with model validation
const deleteFactory = (database: IDatabase) => {
  return async (id: string) => {
    try {
      return await database.findByIdAndDelete(id);
    } catch {
      throw new Error('Error deleting product');
    }
  };
};

export default deleteFactory;
