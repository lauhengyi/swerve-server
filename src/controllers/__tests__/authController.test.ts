import databaseFactory from '../../databaseModules/databaseFactory';
import MockModel from '../../databaseModules/MockModel';
import httpMocks from 'node-mocks-http';
import authController from '../authController';

describe('authController', () => {
  describe('signUp', () => {
    describe('When given a valid user payload', () => {
      it('Should return a status code of 201', async () => {
        const signUp = authController.signUp(databaseFactory(new MockModel()));
        const req = httpMocks.createRequest({
          body: {
            username: 'test',
            email: 'test@test.com',
            password: 'test',
            passwordConfirm: 'test'
          }
        });
        const res = httpMocks.createResponse();

        await signUp(req, res, jest.fn());

        expect(res.statusCode).toBe(201);
      });

      it('Should return a response with the status success, the jwt token and the created user', async () => {
        const signUp = authController.signUp(databaseFactory(new MockModel()));
        const req = httpMocks.createRequest({
          body: {
            username: 'test',
            email: 'test@test.com',
            password: 'test',
            passwordConfirm: 'test'
          }
        });
        const res = httpMocks.createResponse();

        await signUp(req, res, jest.fn());

        const expectedResponse = {
          status: 'success',
          token: '12345',
          user: {
            name: 'Test User'
          }
        };
        expect(res._getJSONData()).toEqual(expectedResponse);
      });
    });

    describe('when given a database that throws an error', () => {
      it('Should call next on that error', async () => {
        const payload = {
          test: 'error'
        };
        const database = databaseFactory(new MockModel());
        const signUp = authController.signUp(database);
        const req = httpMocks.createRequest({ body: payload });
        const res = httpMocks.createResponse();
        const next = jest.fn();

        await signUp(req, res, next);

        expect(next.mock.calls.length).toBe(1);
      });
    });
  });

  describe('logIn', () => {
    describe('When given a valid username and password', () => {
      it('Should return a status code of 200');
    });
  });
});
