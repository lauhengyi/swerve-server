import updateFactory from '../updateFactory';
import mockModel from '../mockModel';

describe('updateFactory', () => {
  describe('When passed in an appropiate model', () => {
    it('Should return a function that calls the model once when given an id', async () => {
      const model = new mockModel();
      const update = updateFactory(model);

      expect(update).toBeInstanceOf(Function);

      await update('123456', { name: 'Test' });
      expect(model.calls).toBe(1);
    });
    it('Should have the returned function return back a promise for the object with the given id', async () => {
      const model = new mockModel();
      const update = updateFactory(model);
      const payload = {
        name: 'test'
      };

      expect(await update('12345', payload)).toEqual(payload);
    });
  });
});