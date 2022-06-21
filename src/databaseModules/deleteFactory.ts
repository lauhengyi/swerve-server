import IModel from '../interfaces/IModel';

const deleteFactory = (model: IModel) => {
  return async (id: string) => {
    await model.findByIdAndDelete(id);
  };
};

export default deleteFactory;
