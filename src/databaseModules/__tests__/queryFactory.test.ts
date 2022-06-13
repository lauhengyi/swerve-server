import queryFactory from '../queryFactory';
import mockModel from '../mockModel';

describe('queryFactory', () => {
  describe('When passed in an appropiate model', () => {
    it('Should return a function that calls the database once when given an id', async () => {
      const database = new mockModel();
      const querier = queryFactory(database);

      expect(querier).toBeInstanceOf(Function);

      await querier({ sort: 'price' });
      expect(database.calls).toBe(1);
    });
    it('Should have the returned function return back a promise for the objects found in the database', async () => {
      const database = new mockModel();
      const querier = queryFactory(database);

      const query = querier({ sort: 'price' });

      expect(await query).toEqual({ name: 'Found object' });
    });
  });
});
