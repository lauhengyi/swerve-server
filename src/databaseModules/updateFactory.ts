import IDatabase from '../interfaces/Idatabase';

// Payload is set as any as mongoose can deal with model validation
const updateFactory = (database: IDatabase) => {
  return async (id: string, payload: any) => {
    try {
      return await database.findByIdAndUpdate(id, payload, {
        new: true,
        runValidators: true
      });
    } catch {
      throw new Error('Error finding product');
    }
  };
};

export default updateFactory;
