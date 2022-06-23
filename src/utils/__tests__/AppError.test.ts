import AppError from '../AppError';

describe('AppError', () => {
  describe('When an AppError is constructed with a message and statusCode', () => {
    it('Should have a message property with the given message', () => {
      const messages = ['Test Error', 'asdjfklasldfja', 'Help me 12345'];
      const statusCodes = [500, 406, 404];

      for (let i = 0; i < messages.length; i++) {
        const err = new AppError(messages[i], statusCodes[i]);
        expect(err.message).toBe(messages[i]);
      }
    });

    it('Should have a statusCode property with the given statusCode', () => {
      const messages = [
        'Test Error 1',
        'asdjfklasldfja 2',
        'Help me 12345 3',
        'Give me help'
      ];
      const statusCodes = [500, 406, 404, 501];

      for (let i = 0; i < messages.length; i++) {
        const err = new AppError(messages[i], statusCodes[i]);
        expect(err.statusCode).toBe(statusCodes[i]);
      }
    });

    it('Should have a status property which defaults to "fail", when statusCode starts with 4, and "error" otherwise', () => {
      const message = 'Test Error';
      const statusCodes = [500, 406, 404, 501, 400, 503, 402];

      const expected = [
        'error',
        'fail',
        'fail',
        'error',
        'fail',
        'error',
        'fail'
      ];

      for (let i = 0; i < statusCodes.length; i++) {
        const err = new AppError(message, statusCodes[i]);
        expect(err.status).toBe(expected[i]);
      }
    });

    it('Should have an "isOperational" property that is set to true', () => {
      const errs = [
        new AppError('Test Error', 500),
        new AppError('Test Error', 404)
      ];

      for (let i = 0; i < errs.length; i++) {
        expect(errs[i].isOperational).toBe(true);
      }
    });

    it('Should not have itself within the stack trace', () => {
      const err = new AppError('Test Error', 500);

      expect(err.stack).not.toMatch(/AppError.ts/);
    });
  });
});
