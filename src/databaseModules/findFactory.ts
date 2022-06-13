import IModel from '../interfaces/IModel';

const findFactory = (model: IModel) => {
  return async (id: string) => {
    try {
      return await model.findById(id);
    } catch {
      throw new Error('Error finding product');
    }
  };
};

export default findFactory;
