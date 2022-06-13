import findFactory from '../findFactory';
import MockModel from '../MockModel';

describe('findFactory', () => {
  describe('When passed in an appropiate model', () => {
    it('Should return a function that calls the model once when given an id', async () => {
      const model = new MockModel();
      const find = findFactory(model);

      expect(find).toBeInstanceOf(Function);

      await find('123456');
      expect(model.calls).toBe(1);
    });
    it('Should have the returned function return back a promise for the object with the given id', async () => {
      const model = new MockModel();
      const find = findFactory(model);
      const idPayload = {
        name: 'Found object'
      };

      expect(await find('12345')).toEqual(idPayload);
    });
  });
});
