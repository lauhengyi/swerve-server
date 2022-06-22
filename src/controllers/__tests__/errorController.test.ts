import httpMocks from 'node-mocks-http';
import AppError from '../../utils/AppError';
import errorController from '../errorController';

describe('errorController', () => {
  describe('When given a suitable error with a statusCode, status and message ', () => {
    it('Should return a response with the same statusCode', () => {
      const errs = [
        new AppError('Test Error', 400),
        new AppError('Test Error', 404),
        new AppError('Test Error', 500)
      ];

      for (let i = 0; i < errs.length; i++) {
        const req = httpMocks.createRequest();
        const res = httpMocks.createResponse();

        errorController(errs[i], req, res, jest.fn());

        expect(res.statusCode).toBe(errs[i].statusCode);
      }
    });

    it('Should return a response with the same status and message', () => {
      const errs = [
        new AppError('Test Error', 400),
        new AppError('Test Error', 404),
        new AppError('Test Error', 500)
      ];

      for (let i = 0; i < errs.length; i++) {
        const req = httpMocks.createRequest();
        const res = httpMocks.createResponse();

        errorController(errs[i], req, res, jest.fn());

        const expectedMessage = {
          status: errs[i].status,
          message: errs[i].message
        };
        expect(res._getJSONData()).toEqual(expectedMessage);
      }
    });
  });
  describe('When given an error with no statusCode or status', () => {
    it('Should default statusCode to 500', () => {
      const errs = [
        new Error('Test Error'),
        new Error('asldfjaklsdfad'),
        new Error(''),
        new Error('1234')
      ];

      for (let i = 0; i < errs.length; i++) {
        const req = httpMocks.createRequest();
        const res = httpMocks.createResponse();

        errorController(errs[i], req, res, jest.fn());

        expect(res.statusCode).toBe(500);
      }
    });

    it('Should default status to "error"', () => {
      const errs = [
        new Error('Test Error'),
        new Error('asldfjaklsdfad'),
        new Error(''),
        new Error('1234')
      ];

      for (let i = 0; i < errs.length; i++) {
        const req = httpMocks.createRequest();
        const res = httpMocks.createResponse();

        errorController(errs[i], req, res, jest.fn());

        expect(res._getJSONData().status).toBe('error');
      }
    });
  });
});
