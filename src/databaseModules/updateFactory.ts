import IDatabase from '../interfaces/Idatabase';

// Payload is set as any object as mongoose can deal with model validation
const updateFactory = (database: IDatabase) => {
  return async (id: string, payload: object) => {
    try {
      return await database.findByIdAndUpdate(id, payload, {
        new: true,
        runValidators: true
      });
    } catch (err) {
      console.log(err);
      throw new Error('Error finding product');
    }
  };
};

export default updateFactory;
