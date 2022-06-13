import queryFactory from '../queryFactory';
import mockModel from '../mockModel';

describe('queryFactory', () => {
  describe('When passed in an appropiate model', () => {
    it('Should return a function that calls the model once when given an id', async () => {
      const model = new mockModel();
      const querier = queryFactory(model);

      expect(querier).toBeInstanceOf(Function);

      await querier({ sort: 'price' });
      expect(model.calls).toBe(1);
    });
    it('Should have the returned function return back a promise for the objects found in the model', async () => {
      const model = new mockModel();
      const querier = queryFactory(model);

      const query = querier({ sort: 'price' });

      expect(await query).toEqual({ name: 'Found object' });
    });
  });
});
