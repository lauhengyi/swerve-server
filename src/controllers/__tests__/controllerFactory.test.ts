import controllerFactory from '../controllerFactory';
import MockModel from '../../databaseModules/MockModel';
import databaseFactory from '../../databaseModules/databaseFactory';
import httpMocks from 'node-mocks-http';

describe('controllerFactory', () => {
  describe('createOne', () => {
    describe('when given a suitable database will return a function which when given a suitable payload', () => {
      it('should return a status code of 201 as well as a suitable message', async () => {
        const payload = {
          name: 'Test'
        };
        const database = databaseFactory(new MockModel());
        const createOne = controllerFactory.createOneFactory(database);
        const req = httpMocks.createRequest({ body: payload });
        const res = httpMocks.createResponse();

        await createOne(req, res);

        expect(res.statusCode).toBe(201);
        const expectedMessage = {
          status: 'success',
          data: {
            doc: payload
          }
        };
        expect(res._getJSONData()).toEqual(expectedMessage);
      });
    });
    describe('When an error is thrown from invalid payload', () => {
      it('should return a status code of 400 and a suitable message', async () => {
        const database = databaseFactory(new MockModel());
        const createOne = controllerFactory.createOneFactory(database);
        const req = httpMocks.createRequest({
          body: {
            test: 'error'
          }
        });
        const res = httpMocks.createResponse();

        await createOne(req, res);

        expect(res.statusCode).toBe(400);
        const expectedMessage = {
          status: 'fail',
          message: { message: 'Test Error for create' }
        };
        expect(res._getJSONData()).toEqual(expectedMessage);
      });
    });
  });
  describe('getOne', () => {
    describe('When given a suitable database will return a function which when given a valid id', () => {
      it('Should return a status code of 200 as well as a suitable message', async () => {
        const database = databaseFactory(new MockModel());
        const getOne = controllerFactory.getOneFactory(database);
        const req = httpMocks.createRequest({
          param: {
            id: 'test'
          }
        });
        const res = httpMocks.createResponse();

        await getOne(req, res);

        expect(res.statusCode).toBe(200);
        const expectedMessage = {
          status: 'success',
          data: {
            doc: {
              name: 'Found object'
            }
          }
        };
        expect(res._getJSONData()).toEqual(expectedMessage);
      });
    });
    describe('When an error is thrown from invalid id', () => {
      it('should return a status code of 404 and a suitable message', async () => {
        const database = databaseFactory(new MockModel());
        const getOne = controllerFactory.getOneFactory(database);
        const req = httpMocks.createRequest({
          param: {
            id: 'error'
          }
        });
        const res = httpMocks.createResponse();

        await getOne(req, res);

        expect(res.statusCode).toBe(404);
        const expectedMessage = {
          status: 'fail',
          message: 'Test Error for findById'
        };
        expect(res._getJSONData()).toEqual(expectedMessage);
      });
    });
  });
  describe('queryAll', () => {
    describe('When given a suitable database will return a function which when given a suitable query', () => {
      it('Should return a status code of 200 as well as a suitable message, returning an array of all queried results', async () => {
        const database = databaseFactory(new MockModel());
        const queryAll = controllerFactory.queryAllFactory(database);
        const req = httpMocks.createRequest({
          query: {
            sort: 'price'
          }
        });
        const res = httpMocks.createResponse();

        await queryAll(req, res);

        expect(res.statusCode).toBe(200);
        const expectedMessage = {
          status: 'success',
          results: 2,
          data: {
            doc: [
              {
                name: 'Found object 1'
              },
              {
                name: 'Found object 2'
              }
            ]
          }
        };
        expect(res._getJSONData()).toEqual(expectedMessage);
      });
    });
    describe('When an error is thrown from invalid query', () => {
      it('should return a status code of 404 and a suitable message', async () => {
        const database = databaseFactory(new MockModel());
        const queryAll = controllerFactory.queryAllFactory(database);
        const req = httpMocks.createRequest({
          query: {
            test: 'error'
          }
        });
        const res = httpMocks.createResponse();

        await queryAll(req, res);

        expect(res.statusCode).toBe(404);
        const expectedMessage = {
          status: 'fail',
          message: 'Test Error for find'
        };
        expect(res._getJSONData()).toEqual(expectedMessage);
      });
    });
  });
  describe('updateOne', () => {
    describe('When given a suitable database will return a function which when given a valid id and payload', () => {
      it('Should return a status code of 200 as well as a suitable message, returning the updated document', async () => {
        const database = databaseFactory(new MockModel());
        const updateOne = controllerFactory.updateOneFactory(database);
        const req = httpMocks.createRequest({
          params: {
            id: '1'
          },
          body: {
            price: '100'
          }
        });
        const res = httpMocks.createResponse();

        await updateOne(req, res);

        expect(res.statusCode).toBe(200);
        const expectedMessage = {
          status: 'success',
          data: {
            doc: {
              price: '100'
            }
          }
        };
        expect(res._getJSONData()).toEqual(expectedMessage);
      });
    });
    describe('When an error is thrown from invalid id', () => {
      it('should return a status code of 404 and a suitable message', async () => {
        const database = databaseFactory(new MockModel());
        const updateOne = controllerFactory.updateOneFactory(database);
        const req = httpMocks.createRequest({
          params: {
            id: 'error'
          }
        });
        const res = httpMocks.createResponse();

        await updateOne(req, res);

        expect(res.statusCode).toBe(404);
        const expectedMessage = {
          status: 'fail',
          message: 'Test Error for findByIdAndUpdate'
        };
        expect(res._getJSONData()).toEqual(expectedMessage);
      });
    });
  });
  describe('deleteOne', () => {
    describe('When given a suitable database will return a function which when given a valid id', () => {
      it('Should return a status code of 204, showing no document', async () => {
        const database = databaseFactory(new MockModel());
        const deleteFactory = controllerFactory.deleteOneFactory(database);
        const req = httpMocks.createRequest({
          params: {
            id: '1'
          }
        });
        const res = httpMocks.createResponse();

        await deleteFactory(req, res);

        expect(res.statusCode).toBe(204);
        expect(res._getData()).toBe('');
      });
    });
    describe('When an error is thrown from invalid id', () => {
      it('should return a status code of 404 and a suitable message', async () => {
        const database = databaseFactory(new MockModel());
        const deleteOne = controllerFactory.deleteOneFactory(database);
        const req = httpMocks.createRequest({
          params: {
            id: 'error'
          }
        });
        const res = httpMocks.createResponse();

        await deleteOne(req, res);

        expect(res.statusCode).toBe(404);
        const expectedMessage = {
          status: 'fail',
          message: 'Test Error for findByIdAndDelete'
        };
        expect(res._getJSONData()).toEqual(expectedMessage);
      });
    });
  });
});
