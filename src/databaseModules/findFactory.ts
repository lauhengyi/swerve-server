import IDatabase from '../interfaces/Idatabase';

// Payload is set as any as mongoose can deal with model validation
const findFactory = (database: IDatabase) => {
  return async (id: string) => {
    try {
      return await database.findById(id);
    } catch {
      throw new Error('Error finding product');
    }
  };
};

export default findFactory;
