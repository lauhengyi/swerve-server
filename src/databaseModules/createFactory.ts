import IModel from '../interfaces/IModel';

// Payload is set as any object as mongoose can deal with model validation
const createFactory = (model: IModel) => {
  return async (payload: object) => {
    try {
      return await model.create(payload);
    } catch {
      throw new Error('Error creating product');
    }
  };
};

export default createFactory;
