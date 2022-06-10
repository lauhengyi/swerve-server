import getFilterObj from '../getFilterObj';

describe('getFilterObj', () => {
  describe('When given a request query obj', () => {
    it("Should return a query obj with the keywords 'page, sort, limit, fields' filtered out", () => {
      const queryParams = {
        name: 'test',
        page: 1,
        sort: 'asc',
        price: '100',
        limit: 6,
        fields: 'name, price'
      };
      const queryObj = getFilterObj(queryParams);

      const expected = {
        name: 'test',
        price: '100'
      };

      expect(queryObj).toEqual(expected);
    });

    it("Should return a query obj which adds the prefix '$' to fields with ranges in them, like 'gte, gt, lte, lt'", () => {
      const queryParams = {
        name: 'test',
        price: { gte: 100, lte: 300 },
        sort: 'asc',
        limit: 6,
        fields: 'name, price',
        rating: { gt: 2, lt: 5 },
        gte: 5
      };

      const queryObj = getFilterObj(queryParams);

      const expected = {
        name: 'test',
        price: { $gte: 100, $lte: 300 },
        rating: { $gt: 2, $lt: 5 },
        gte: 5
      };

      expect(queryObj).toEqual(expected);
    });
  });
});
