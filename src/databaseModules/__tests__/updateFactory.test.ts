import updateFactory from '../updateFactory';
import mockModel from '../mockModel';

describe('queryFactory', () => {
  describe('When passed in an appropiate model', () => {
    it('Should return a function that calls the database once when given an id', async () => {
      const database = new mockModel();
      const update = updateFactory(database);

      expect(update).toBeInstanceOf(Function);

      await update('123456', { name: 'Test' });
      expect(database.calls).toBe(1);
    });
    it('Should have the returned function return back a promise for the object with the given id', async () => {
      const database = new mockModel();
      const update = updateFactory(database);
      const payload = {
        name: 'test'
      };

      expect(await update('12345', payload)).toEqual(payload);
    });
  });
});
