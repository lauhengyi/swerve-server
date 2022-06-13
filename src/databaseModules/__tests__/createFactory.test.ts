import createFactory from '../createFactory';
import MockModel from '../MockModel';

describe('CreateFactory', () => {
  describe('When passed in an appropiate model', () => {
    it('Should return a function that calls the model to create once', async () => {
      const model = new MockModel();
      const create = createFactory(model);

      expect(create).toBeInstanceOf(Function);

      await create({ name: 'Test' });
      expect(model.calls).toBe(1);
    });
    it('Should have the returned function return back a promise for the object created in the model', async () => {
      const model = new MockModel();
      const create = createFactory(model);
      const payload = {
        name: 'Test',
        description: 'This is a test',
        help: 'me'
      };

      expect(await create(payload)).toEqual(payload);
    });
  });
});
