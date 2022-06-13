import IModel from '../interfaces/IModel';

// Payload is set as any object as mongoose can deal with model validation
const updateFactory = (model: IModel) => {
  return async (id: string, payload: object) => {
    try {
      return await model.findByIdAndUpdate(id, payload, {
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
