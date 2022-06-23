import makeApp from '../../makeApp';
import mockCollection from '../../databaseModules/mockCollection';
import request from 'supertest';

describe('GET /products', () => {
  describe('When the request is valid', () => {
    it('Should have a status code 200', async () => {
      const app = makeApp(mockCollection);

      const response = await request(app)
        .get('/api/v1/products')
        .query({ sort: 'price' });

      expect(response.status).toBe(200);
    });

    it('Should return a content with a content-type of json', async () => {
      const app = makeApp(mockCollection);

      const response = await request(app)
        .get('/api/v1/products')
        .query({ sort: 'price' });

      expect(response.headers['content-type']).toMatch(/json/);
    });

    it('Should return a message with a status success and the data of the found documents in an array, and the number of documents queried', async () => {
      const app = makeApp(mockCollection);

      const response = await request(app)
        .get('/api/v1/products')
        .query({ sort: 'price' });

      const expectedMessage = {
        status: 'success',
        results: 2,
        data: {
          doc: [{ name: 'Found object 1' }, { name: 'Found object 2' }]
        }
      };

      expect(response.body).toEqual(expectedMessage);
    });
  });

  describe('When a request is invalid', () => {
    it('Should have a status code 404', async () => {
      const app = makeApp(mockCollection);

      const response = await request(app)
        .get('/api/v1/products')
        .query({ test: 'error' });

      expect(response.status).toBe(404);
    });

    it('Should return a content with a content-type of json', async () => {
      const app = makeApp(mockCollection);

      const response = await request(app)
        .get('/api/v1/products')
        .query({ test: 'error' });

      expect(response.headers['content-type']).toMatch(/json/);
    });
  });
});
