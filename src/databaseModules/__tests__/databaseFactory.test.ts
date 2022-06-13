import mockModel from '../mockModel';
import databaseFactory from '../databaseFactory';
describe('databaseFactory', () => {
  describe('When given a model', () => {
    it('Should return an object that has the methods create, find, query, update and delete', () => {
      const model = new mockModel();
      const database = databaseFactory(model);

      expect(database).toBeInstanceOf(Object);
      expect(database).toHaveProperty('create');
      expect(database).toHaveProperty('find');
      expect(database).toHaveProperty('query');
      expect(database).toHaveProperty('update');
      expect(database).toHaveProperty('delete');
    });
  });
});
