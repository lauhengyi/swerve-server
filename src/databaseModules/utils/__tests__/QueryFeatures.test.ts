import QueryFeatures from '../QueryFeatures';
import mockQuery from '../../mockQuery';

describe('QueryFeatures', () => {
  describe('When filtering', () => {
    it('Will call the database query once', async () => {
      const query = new mockQuery({ name: 'test' });

      const queryObj = new QueryFeatures(query, { sort: 'price' }).filter();

      expect(query.calls).toBe(1);
      expect(await queryObj.query).toEqual({ name: 'test' });
    });
  });
  describe('When sorting', () => {
    it('Will call the database query once', async () => {
      const query = new mockQuery({ name: 'test' });

      const queryObj = new QueryFeatures(query, { sort: 'price' }).sort();

      expect(query.calls).toBe(1);
      expect(await queryObj.query).toEqual({ name: 'test' });
    });
  });
  describe('When selecting fields', () => {
    it('Will call the database query once', async () => {
      const query = new mockQuery({ name: 'test' });

      const queryObj = new QueryFeatures(query, {
        sort: 'price'
      }).selectFields();

      expect(query.calls).toBe(1);
      expect(await queryObj.query).toEqual({ name: 'test' });
    });
  });
  describe('When paginating', () => {
    it('Will call the database query twice, limit and skip', async () => {
      const query = new mockQuery({ name: 'test' });

      const queryObj = new QueryFeatures(query, {
        sort: 'price'
      }).paginate();

      expect(query.calls).toBe(2);
      expect(await queryObj.query).toEqual({ name: 'test' });
    });
  });
  describe('When filtering, sorting, selecting fields and paginating', () => {
    it('Will call the database query 5 times', async () => {
      const query = new mockQuery({ name: 'test' });

      const queryObj = new QueryFeatures(query, { sort: 'price' })
        .filter()
        .sort()
        .selectFields()
        .paginate();

      expect(query.calls).toBe(5);
      expect(await queryObj.query).toEqual({ name: 'test' });
    });
  });
});
