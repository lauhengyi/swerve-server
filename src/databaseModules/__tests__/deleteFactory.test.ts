import deleteFactory from '../deleteFactory';
import mockModel from '../../mockModel';

describe('CreateFactory', () => {
  describe('When passed in an appropiate model', () => {
    it('Should return a function that calls the database to create once', () => {
      const database = new mockModel();
      const create = deleteFactory(database);

      expect(create).toBeInstanceOf(Function);

      create({ name: 'Test' });
      expect(database.calls).toBe(1);
    });
  });
});
