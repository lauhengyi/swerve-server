import IModel from '../interfaces/IModel';

const findFactory = (model: IModel) => {
  return async (id: string) => {
    return await model.findById(id);
  };
};

export default findFactory;
