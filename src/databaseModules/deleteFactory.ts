import IModel from '../interfaces/IModel';

const deleteFactory = (model: IModel) => {
  return async (id: string) => {
    try {
      return await model.findByIdAndDelete(id);
    } catch {
      throw new Error('Error deleting product');
    }
  };
};

export default deleteFactory;
