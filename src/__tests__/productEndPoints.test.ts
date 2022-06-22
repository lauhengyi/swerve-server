import makeApp from '../makeApp';
import mockCollection from '../databaseModules/mockCollection';
import request from 'supertest';

describe('POST /products', () => {
  describe('when the request is valid', () => {
    it('Should have a status code 201', async () => {
      const app = makeApp(mockCollection);
      const body = {
        name: 'Test'
      };

      const response = await request(app).post('/api/v1/products').send(body);

      expect(response.status).toBe(201);
    });

    it('Should return a content with a content-type of json', async () => {
      const app = makeApp(mockCollection);
      const body = {
        name: 'Test'
      };

      const response = await request(app).post('/api/v1/products').send(body);

      expect(response.headers['content-type']).toMatch(/json/);
    });

    it('Should return a message with a status success and the data of the created document', async () => {
      const app = makeApp(mockCollection);
      const body = {
        name: 'Test'
      };

      const response = await request(app).post('/api/v1/products').send(body);

      const expectedMessage = {
        status: 'success',
        data: {
          doc: body
        }
      };
      expect(response.body).toEqual(expectedMessage);
    });
  });

  describe('When a request is invalid', () => {
    it('Should have a status code 400', async () => {
      const app = makeApp(mockCollection);
      const body = {
        test: 'error'
      };

      const response = await request(app).post('/api/v1/products').send(body);

      expect(response.status).toBe(400);
    });

    it('Should return a content with a content-type of json', async () => {
      const app = makeApp(mockCollection);
      const body = {
        test: 'error'
      };

      const response = await request(app).post('/api/v1/products').send(body);

      expect(response.headers['content-type']).toMatch(/json/);
    });
  });
});

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
  });
});

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

describe('PATCH /products/:id', () => {
  describe('When the id is valid and it exists', () => {
    it('Should have a status code 200', async () => {
      const app = makeApp(mockCollection);

      const response = await request(app)
        .patch('/api/v1/products/testID')
        .send({ name: 'Updated object' });

      expect(response.status).toBe(200);
    });

    it('Should return a content with a content-type of json', async () => {
      const app = makeApp(mockCollection);

      const response = await request(app)
        .patch('/api/v1/products/testID')
        .send({ name: 'Updated object' });

      expect(response.headers['content-type']).toMatch(/json/);
    });

    it('Should return a message with a status success and the data of the updated document', async () => {
      const app = makeApp(mockCollection);

      const response = await request(app)
        .patch('/api/v1/products/testID')
        .send({ name: 'Updated object' });

      const expectedMessage = {
        status: 'success',
        data: {
          doc: {
            name: 'Updated object'
          }
        }
      };

      expect(response.body).toEqual(expectedMessage);
    });
  });

  describe('When the id is valid but does not exist', () => {
    it('Should have a status code 404', async () => {
      const app = makeApp(mockCollection);

      const response = await request(app).patch('/api/v1/products/notFound');

      expect(response.status).toBe(404);
    });

    it('Should return a content with a content-type of json', async () => {
      const app = makeApp(mockCollection);

      const response = await request(app).patch('/api/v1/products/notFound');

      expect(response.headers['content-type']).toMatch(/json/);
    });
  });
});

describe('DELETE /products/:id', () => {
  describe('When the id is valid and exists', () => {
    it('Should have a status code 204', async () => {
      const app = makeApp(mockCollection);

      const response = await request(app).delete('/api/v1/products/testID');

      expect(response.status).toBe(204);
    });
    it('Should return no content', async () => {
      const app = makeApp(mockCollection);

      const response = await request(app).delete('/api/v1/products/testID');

      expect(response.body).toEqual({});
    });
  });

  describe('When the id is valid but does not exist', () => {
    it('Should have a status code 404', async () => {
      const app = makeApp(mockCollection);

      const response = await request(app).delete('/api/v1/products/notFound');

      expect(response.status).toBe(404);
    });

    it('Should return a content with a content-type of json', async () => {
      const app = makeApp(mockCollection);

      const response = await request(app).delete('/api/v1/products/notFound');

      expect(response.headers['content-type']).toMatch(/json/);
    });
  });
});
