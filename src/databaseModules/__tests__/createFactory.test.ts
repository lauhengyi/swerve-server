import createFactory from '../createFactory';
import mockModel from '../mockModel';

describe('CreateFactory', () => {
  describe('When passed in an appropiate model', () => {
    it('Should return a function that calls the database to create once', async () => {
      const database = new mockModel();
      const create = createFactory(database);

      expect(create).toBeInstanceOf(Function);

      await create({ name: 'Test' });
      expect(database.calls).toBe(1);
    });
    it('Should have the returned function return back a promise for the object created in the database', async () => {
      const database = new mockModel();
      const create = createFactory(database);
      const payload = {
        name: 'Test',
        description: 'This is a test',
        help: 'me'
      };

      expect(await create(payload)).toEqual(payload);
    });
  });
});
