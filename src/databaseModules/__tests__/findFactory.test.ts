import findFactory from '../findFactory';
import mockModel from '../mockModel';

describe('findFactory', () => {
  describe('When passed in an appropiate model', () => {
    it('Should return a function that calls the database once when given an id', async () => {
      const database = new mockModel();
      const find = findFactory(database);

      expect(find).toBeInstanceOf(Function);

      await find('123456');
      expect(database.calls).toBe(1);
    });
    it('Should have the returned function return back a promise for the object with the given id', async () => {
      const database = new mockModel();
      const find = findFactory(database);
      const idPayload = {
        name: 'Found object'
      };

      expect(await find('12345')).toEqual(idPayload);
    });
  });
});
