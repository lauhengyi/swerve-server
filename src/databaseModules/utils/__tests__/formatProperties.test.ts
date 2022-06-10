import formatProperties from '../formatProperties';

describe('formatProperties', () => {
  describe('When given a string of properties separated with commas', () => {
    it('Should return a string of the same properties separated with spaces, and trim any additional whitespaces', () => {
      const properties = 'name, price, rating,description,category';
      const formatted = formatProperties(properties);

      expect(formatted).toBe('name price rating description category');
    });
  });
});
