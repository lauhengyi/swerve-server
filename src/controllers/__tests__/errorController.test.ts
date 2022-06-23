import httpMocks from 'node-mocks-http';
import AppError from '../../utils/AppError';
import errorController from '../errorController';
import mongoose from 'mongoose';

describe('errorController', () => {
  describe('When given a suitable a given app error with statusCode and status', () => {
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

  describe('When given a non-mongoose error with no statusCode or status', () => {
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

    it('Should respond with a status of "error" and a default message of "Something went wrong"', () => {
      const errs = [
        new Error('Test Error'),
        new Error('asldfjaklsdfad'),
        new Error(''),
        new Error('1234')
      ];
      const expectedMessage = {
        status: 'error',
        message: 'Something went wrong'
      };

      for (let i = 0; i < errs.length; i++) {
        const req = httpMocks.createRequest();
        const res = httpMocks.createResponse();

        errorController(errs[i], req, res, jest.fn());

        expect(res._getJSONData()).toEqual(expectedMessage);
      }
    });
  });

  describe('When given a mongoose CastError', () => {
    it('Should have a statusCode of 400', () => {
      const err = new mongoose.Error.CastError(
        'CastError',
        '12341231asdf',
        '_id'
      );

      const req = httpMocks.createRequest();
      const res = httpMocks.createResponse();

      errorController(err, req, res, jest.fn());

      expect(res.statusCode).toBe(400);
    });

    it('Should have a status of "error" and an a message "Invalid ${path}: ${inputedPathValue}', () => {
      const err = new mongoose.Error.CastError(
        'CastError',
        '12341231asdf',
        '_id'
      );

      const req = httpMocks.createRequest();
      const res = httpMocks.createResponse();

      errorController(err, req, res, jest.fn());

      const expectedMessage = {
        status: 'fail',
        message: 'Invalid _id: 12341231asdf'
      };
      expect(res._getJSONData()).toEqual(expectedMessage);
    });
  });
});
