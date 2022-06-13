import deleteFactory from '../deleteFactory';
import mockModel from '../mockModel';

describe('deleteFactory', () => {
  describe('When passed in an appropiate model', () => {
    it('Should return a function that calls the model once when given an id', async () => {
      const model = new mockModel();
      const deleter = deleteFactory(model);

      expect(deleter).toBeInstanceOf(Function);

      await deleter('123456');
      expect(model.calls).toBe(1);
    });
    it('Should have the returned function return back a promise for nothing when given an id', async () => {
      const model = new mockModel();
      const deleter = deleteFactory(model);
      const idPayload = {
        name: 'Found object and deleted'
      };

      expect(await deleter('12345')).toEqual(idPayload);
    });
  });
});
