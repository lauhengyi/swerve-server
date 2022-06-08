import IDatabase from '../interfaces/Idatabase';

// Payload is set as any as mongoose can deal with model validation
const createFactory = (database: IDatabase) => {
  return async (payload: any) => {
    try {
      return await database.create(payload);
    } catch {
      throw new Error('Error creating product');
    }
  };
};

export default createFactory;
