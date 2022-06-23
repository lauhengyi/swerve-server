import makeApp from '../../makeApp';
import mockCollection from '../../databaseModules/mockCollection';
import request from 'supertest';

describe('GET /products/:id', () => {
  describe('When the id is valid and exists', () => {
    it('Should have a status code 200', async () => {
      const app = makeApp(mockCollection);

      const response = await request(app).get('/api/v1/products/testID');

      expect(response.status).toBe(200);
    });

    it('Should return a content with a content-type of json', async () => {
      const app = makeApp(mockCollection);

      const response = await request(app).get('/api/v1/products/testID');

      expect(response.headers['content-type']).toMatch(/json/);
    });

    it('Should return a message with a status success and the data of the found document', async () => {
      const app = makeApp(mockCollection);

      const response = await request(app).get('/api/v1/products/testID');

      const expectedMessage = {
        status: 'success',
        data: {
          doc: {
            name: 'Found object'
          }
        }
      };
      expect(response.body).toEqual(expectedMessage);
    });
  });

  describe('When the id is valid but does not exist', () => {
    it('Should have a status code 404', async () => {
      const app = makeApp(mockCollection);

      const response = await request(app).get('/api/v1/products/notFound');

      expect(response.status).toBe(404);
    });

    it('Should return a content with a content-type of json', async () => {
      const app = makeApp(mockCollection);

      const response = await request(app).get('/api/v1/products/notFound');

      expect(response.headers['content-type']).toMatch(/json/);
    });
    it('Should respond with a status of "fail" and a message of "No document found with this ID"', async () => {
      const app = makeApp(mockCollection);

      const response = await request(app).get('/api/v1/products/notFound');

      const expectedMessage = {
        status: 'fail',
        message: 'No document found with this ID'
      };
      expect(response.body).toEqual(expectedMessage);
    });
  });
  describe('When the id is invalid', () => {
    it('Should have a status code of 400', async () => {
      const app = makeApp(mockCollection);

      const response = await request(app).get('/api/v1/products/invalidId');

      expect(response.status).toBe(400);
    });

    it('Should return a content with a content-type of json', async () => {
      const app = makeApp(mockCollection);

      const response = await request(app).get('/api/v1/products/invalidId');

      expect(response.headers['content-type']).toMatch(/json/);
    });

    it('Should respond with a status of "fail" and a message of "Invalid id: ${invalidId}"', async () => {
      const app = makeApp(mockCollection);

      const response = await request(app).get('/api/v1/products/invalidId');

      const expectedMessage = {
        status: 'fail',
        message: 'Invalid id: invalidId'
      };
      expect(response.body).toEqual(expectedMessage);
    });
  });
});
