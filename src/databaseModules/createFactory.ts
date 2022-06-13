import IModel from '../interfaces/IModel';

// Payload is set as any object as mongoose can deal with model validation
const createFactory = (model: IModel) => {
  return async (payload: object) => {
    return await model.create(payload);
  };
};

export default createFactory;
