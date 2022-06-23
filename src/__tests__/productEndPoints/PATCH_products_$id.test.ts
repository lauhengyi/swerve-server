import makeApp from '../../makeApp';
import mockCollection from '../../databaseModules/mockCollection';
import request from 'supertest';

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

    it('Should respond with a status of "fail" and a message of "No document found with this ID"', async () => {
      const app = makeApp(mockCollection);

      const response = await request(app).patch('/api/v1/products/notFound');

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

      const response = await request(app).patch('/api/v1/products/invalidId');

      expect(response.status).toBe(400);
    });

    it('Should return a content with a content-type of json', async () => {
      const app = makeApp(mockCollection);

      const response = await request(app).patch('/api/v1/products/invalidId');

      expect(response.headers['content-type']).toMatch(/json/);
    });

    it('Should respond with a status of "fail" and a message of "Invalid id: ${invalidId}"', async () => {
      const app = makeApp(mockCollection);

      const response = await request(app).patch('/api/v1/products/invalidId');

      const expectedMessage = {
        status: 'fail',
        message: 'Invalid _id: invalidId'
      };
      expect(response.body).toEqual(expectedMessage);
    });
  });

  describe('When the requested product to be updated is invalid', () => {
    it('Should have a status code of 400', async () => {
      const app = makeApp(mockCollection);

      const response = await request(app)
        .patch('/api/v1/products/testID')
        .send({ test: 'error' });

      expect(response.status).toBe(400);
    });

    it('Should return a content with a content type of json ', async () => {
      const app = makeApp(mockCollection);

      const response = await request(app)
        .patch('/api/v1/products/testID')
        .send({ test: 'error' });

      expect(response.headers['content-type']).toMatch(/json/);
    });

    it('Should respond with a status of "fail" and a appriopriate message', async () => {
      const app = makeApp(mockCollection);

      const response = await request(app)
        .patch('/api/v1/products/testID')
        .send({ test: 'error' });

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

      const response = await request(app)
        .patch('/api/v1/products/1234')
        .send(body);

      expect(response.status).toBe(400);
    });

    it('Should return a status of "fail" and a message stating the name and value of the duplicated field', async () => {
      const app = makeApp(mockCollection);
      const body = {
        test: 'duplicateField'
      };

      const response = await request(app)
        .patch('/api/v1/products/1234')
        .send(body);

      const expectedResponse = {
        status: 'fail',
        message: 'The username, "SpicyMeatball", is already taken'
      };
      expect(response.body).toEqual(expectedResponse);
    });
  });
});
