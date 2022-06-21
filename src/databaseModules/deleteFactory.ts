import IModel from '../interfaces/IModel';

const deleteFactory = (model: IModel) => {
  return async (id: string) => {
    console.log('HI');
    await model.findByIdAndDelete(id);
  };
};

export default deleteFactory;
