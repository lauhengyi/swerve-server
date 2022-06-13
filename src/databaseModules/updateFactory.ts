import IModel from '../interfaces/IModel';

// Payload is set as any object as mongoose can deal with model validation
const updateFactory = (model: IModel) => {
  return async (id: string, payload: object) => {
    return await model.findByIdAndUpdate(id, payload, {
      new: true,
      runValidators: true
    });
  };
};

export default updateFactory;
