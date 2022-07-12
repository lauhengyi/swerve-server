import app from '../../app';
import request from 'supertest';
import testDBSetup from '../../testUtils/testDBSetup';

testDBSetup();

describe('PATCH /products/:id', () => {
  describe('When the id is valid and it exists', () => {
    it('Should have a status code 200', async () => {
      // Add product into database
      const body = {
        name: 'Test name',
        price: 10,
        description: 'This is a test price',
        coverImage: './test',
        category: 'Umbrella'
      };
      const productToBeUpdated = await request(app)
        .post('/api/v1/products')
        .send(body);

      const response = await request(app)
        .patch(`/api/v1/products/${productToBeUpdated.body.data.doc._id}`)
        .send({ name: 'Updated object' });

      expect(response.status).toBe(200);
    });

    it('Should return a content with a content-type of json', async () => {
      // Add product into database
      const body = {
        name: 'Test name',
        price: 10,
        description: 'This is a test price',
        coverImage: './test',
        category: 'Umbrella'
      };
      const productToBeUpdated = await request(app)
        .post('/api/v1/products')
        .send(body);

      const response = await request(app)
        .patch(`/api/v1/products/${productToBeUpdated.body.data.doc._id}`)
        .send({ name: 'Updated object' });

      expect(response.headers['content-type']).toMatch(/json/);
    });

    it('Should return a message with a status success and the data of the updated document', async () => {
      // Add product into database
      const body = {
        name: 'Test name',
        price: 10,
        description: 'This is a test price',
        coverImage: './test',
        category: 'Umbrella'
      };
      const productToBeUpdated = await request(app)
        .post('/api/v1/products')
        .send(body);

      const response = await request(app)
        .patch(`/api/v1/products/${productToBeUpdated.body.data.doc._id}`)
        .send({ name: 'Updated object' });

      productToBeUpdated.body.data.doc.name = 'Updated object';
      const expectedMessage = {
        status: 'success',
        data: {
          doc: productToBeUpdated.body.data.doc
        }
      };

      expect(response.body).toEqual(expectedMessage);
    });
  });

  describe('When the id is valid but does not exist', () => {
    it('Should have a status code 404', async () => {
      const response = await request(app).patch(
        '/api/v1/products/507f1f77bcf86cd799439011'
      );

      expect(response.status).toBe(404);
    });

    it('Should return a content with a content-type of json', async () => {
      const response = await request(app).patch(
        '/api/v1/products/507f1f77bcf86cd799439011'
      );

      expect(response.headers['content-type']).toMatch(/json/);
    });

    it('Should respond with a status of "fail" and a message of "No document found with this ID."', async () => {
      const response = await request(app).patch(
        '/api/v1/products/507f1f77bcf86cd799439011'
      );

      const expectedMessage = {
        status: 'fail',
        message: 'No document found with this ID.'
      };
      expect(response.body).toEqual(expectedMessage);
    });
  });

  describe('When the id is invalid', () => {
    it('Should have a status code of 400', async () => {
      const response = await request(app).patch('/api/v1/products/invalidId');

      expect(response.status).toBe(400);
    });

    it('Should return a content with a content-type of json', async () => {
      const response = await request(app).patch('/api/v1/products/invalidId');

      expect(response.headers['content-type']).toMatch(/json/);
    });

    it('Should respond with a status of "fail" and a message of "Invalid id: ${invalidId}"', async () => {
      const response = await request(app).patch('/api/v1/products/invalidId');

      const expectedMessage = {
        status: 'fail',
        message: 'Invalid _id: invalidId.'
      };
      expect(response.body).toEqual(expectedMessage);
    });
  });

  describe('When the requested product to be updated is invalid', () => {
    it('Should have a status code of 400', async () => {
      // Add product into database
      const body = {
        name: 'Test name',
        price: 10,
        description: 'This is a test price',
        coverImage: './test',
        category: 'Umbrella'
      };
      const productToBeUpdated = await request(app)
        .post('/api/v1/products')
        .send(body);

      const response = await request(app)
        .patch(`/api/v1/products/${productToBeUpdated.body.data.doc._id}`)
        .send({ price: 'error' });

      expect(response.status).toBe(400);
    });

    it('Should return a content with a content type of json ', async () => {
      // Add product into database
      const body = {
        name: 'Test name',
        price: 10,
        description: 'This is a test price',
        coverImage: './test',
        category: 'Umbrella'
      };
      const productToBeUpdated = await request(app)
        .post('/api/v1/products')
        .send(body);

      const response = await request(app)
        .patch(`/api/v1/products/${productToBeUpdated.body.data.doc._id}`)
        .send({ price: 'error' });

      expect(response.headers['content-type']).toMatch(/json/);
    });

    it('Should respond with a status of "fail" and a appriopriate message', async () => {
      // Add product into database
      const body = {
        name: 'Test name',
        price: 10,
        description: 'This is a test price',
        coverImage: './test',
        category: 'Umbrella'
      };
      const productToBeUpdated = await request(app)
        .post('/api/v1/products')
        .send(body);

      const response = await request(app)
        .patch(`/api/v1/products/${productToBeUpdated.body.data.doc._id}`)
        .send({ price: 'error' });

      const expectedMessage = {
        status: 'fail',
        message: 'Invalid price: error.'
      };
      expect(response.body).toEqual(expectedMessage);
    });
  });
});
