import catchAsync from '../catchAsync';
import httpMocks from 'node-mocks-http';

describe('catchAsync', () => {
  describe('When given a middleware function that throws an error', () => {
    it('Should return a function that returns a promise', () => {
      const req = httpMocks.createRequest();
      const res = httpMocks.createResponse();

      const returnedFunction = catchAsync(async () => {
        return await Promise.reject(new Error('Test Error'));
      });

      expect(returnedFunction).toBeInstanceOf(Function);
      expect(returnedFunction(req, res, jest.fn())).toBeInstanceOf(Promise);
    });

    it('Should call next on that error', async () => {
      const req = httpMocks.createRequest();
      const res = httpMocks.createResponse();
      const next = jest.fn();
      const returnedFunction = catchAsync(async () => {
        return await Promise.reject(new Error('Test Error'));
      });

      await returnedFunction(req, res, next);

      expect(next.mock.calls.length).toBe(1);
    });
  });
});
