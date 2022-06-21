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

        errorController(errs[i], req, res);

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

        errorController(errs[i], req, res);

        const expectedMessage = {
          status: errs[i].status,
          message: errs[i].message
        };
        expect(res._getJSONData()).toEqual(expectedMessage);
      }
    });
  });
});
