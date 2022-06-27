import httpMocks from 'node-mocks-http';
import AppError from '../../utils/AppError';
import errorController from '../errorController';
import mongoose from 'mongoose';
import MongoServerError from '../../databaseModules/MongoServerError';

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

    it('Should respond with a status of "error" and a default message of "Something went wrong", and the unhandled error message', () => {
      const err = new Error('Test Error');
      const req = httpMocks.createRequest();
      const res = httpMocks.createResponse();

      errorController(err, req, res, jest.fn());

      const expectedMessage = {
        status: 'error',
        message: 'Something went wrong',
        err: 'Test Error'
      };
      expect(res._getJSONData()).toEqual(expectedMessage);
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

  describe('When given a mongoose ValidationError', () => {
    it('Should have a statusCode of 400', () => {
      const err = new mongoose.Error.ValidationError();
      const req = httpMocks.createRequest();
      const res = httpMocks.createResponse();

      errorController(err, req, res, jest.fn());

      expect(res.statusCode).toBe(400);
    });

    it('Should have a status of fail and a message of the same message as the original error', () => {
      const err = new mongoose.Error.ValidationError();
      const req = httpMocks.createRequest();
      const res = httpMocks.createResponse();

      errorController(err, req, res, jest.fn());

      const expectedMessage = {
        status: 'fail',
        message: 'Validation failed'
      };
      expect(res._getJSONData()).toEqual(expectedMessage);
    });
  });

  describe('When given a mongoDB duplicate key error', () => {
    it('Should have a statusCode of 400', () => {
      const err1 = new MongoServerError(
        'E11000 duplicate key error collection: test.products index: name_1 dup key: { name: "Super oddfs" }',
        11000
      );
      const err2 = new MongoServerError(
        'E11000 duplicate key error collection: test.products index: username_1 dup key: { username: "SpicyMeatball" }',
        11000
      );
      const errs = [err1, err2];

      for (let i = 0; i < errs.length; i++) {
        const req = httpMocks.createRequest();
        const res = httpMocks.createResponse();

        errorController(errs[i], req, res, jest.fn());

        expect(res.statusCode).toBe(400);
      }
    });

    it('Should have a status of "fail" and a message stating the name of the duplicated field and the value that was duplicated', () => {
      const err1 = new MongoServerError(
        'E11000 duplicate key error collection: test.products index: name_1 dup key: { name: "Super oddfs" }',
        11000
      );
      const err2 = new MongoServerError(
        'E11000 duplicate key error collection: test.products index: username_1 dup key: { username: "SpicyMeatball" }',
        11000
      );
      const errs = [err1, err2];

      const expectedResponses = [
        {
          status: 'fail',
          message: 'The name, "Super oddfs", is already taken'
        },
        {
          status: 'fail',
          message: 'The username, "SpicyMeatball", is already taken'
        }
      ];

      for (let i = 0; i < errs.length; i++) {
        const req = httpMocks.createRequest();
        const res = httpMocks.createResponse();

        errorController(errs[i], req, res, jest.fn());

        expect(res._getJSONData()).toEqual(expectedResponses[i]);
      }
    });
  });
});
