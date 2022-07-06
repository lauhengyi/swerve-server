import makeApp from '../../makeApp';
import mockCollection from '../../databaseModules/mockCollection';
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
          doc: {
            _id: 'testId',
            name: 'Test'
          }
        }
      };
      expect(response.body).toEqual(expectedMessage);
    });
  });

  describe('When requested product to be created is invalid', () => {
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

    it('Should respond with a status of "fail" and and a appropriate message', async () => {
      const app = makeApp(mockCollection);
      const body = {
        test: 'error'
      };

      const response = await request(app).post('/api/v1/products').send(body);

      const expectedMessage = {
        status: 'fail',
        message: 'Validation failed'
      };
      expect(response.body).toEqual(expectedMessage);
    });
  });

  describe('When request product to be created as a duplicated field that needs to be unique', () => {
    it('Should have a status code 400', async () => {
      const app = makeApp(mockCollection);
      const body = {
        test: 'duplicateField'
      };

      const response = await request(app).post('/api/v1/products').send(body);

      expect(response.status).toBe(400);
    });

    it('Should return a status of "fail" and a message stating the name and value of the duplicated field', async () => {
      const app = makeApp(mockCollection);
      const body = {
        test: 'duplicateField'
      };

      const response = await request(app).post('/api/v1/products').send(body);

      const expectedResponse = {
        status: 'fail',
        message: 'The username, "SpicyMeatball", is already taken'
      };
      expect(response.body).toEqual(expectedResponse);
    });
  });
});
