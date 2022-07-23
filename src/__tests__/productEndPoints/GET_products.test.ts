import app from '../../app';
import request from 'supertest';
import testDBSetup from '../../testUtils/testDBSetup';

testDBSetup();

describe('GET /products', () => {
  describe('When the request is valid and there is no results', () => {
    it('Should have a status code 200', async () => {
      const response = await request(app)
        .get('/api/v1/products')
        .query({ sort: 'price' });

      expect(response.status).toBe(200);
    });

    it('Should return a content with a content-type of json', async () => {
      const response = await request(app)
        .get('/api/v1/products')
        .query({ sort: 'price' });

      expect(response.headers['content-type']).toMatch(/json/);
    });

    it('Should return a message with a status success and an empty array', async () => {
      const response = await request(app)
        .get('/api/v1/products')
        .query({ sort: 'price' });

      const expectedMessage = {
        status: 'success',
        results: 0,
        data: {
          doc: [],
        },
      };

      expect(response.body).toEqual(expectedMessage);
    });
  });

  describe('When the request is valid and there is some results', () => {
    it('Should have a status code 200', async () => {
      const body1 = {
        name: 'Test name',
        price: 10,
        description: 'This is a test price',
        coverImage: './test',
        category: 'Umbrella',
      };
      const body2 = {
        name: 'Test name 2',
        price: 14,
        description: 'This is a test price 2',
        coverImage: './test2',
        category: 'Brushes',
      };
      await request(app).post('/api/v1/products').send(body1);
      await request(app).post('/api/v1/products').send(body2);

      const response = await request(app)
        .get('/api/v1/products')
        .query({ sort: 'price' });

      expect(response.status).toBe(200);
    });

    it('Should return a content with a content-type of json', async () => {
      const body1 = {
        name: 'Test name',
        price: 10,
        description: 'This is a test price',
        coverImage: './test',
        category: 'Umbrella',
      };
      const body2 = {
        name: 'Test name 2',
        price: 14,
        description: 'This is a test price 2',
        coverImage: './test2',
        category: 'Brushes',
      };
      await request(app).post('/api/v1/products').send(body1);
      await request(app).post('/api/v1/products').send(body2);

      const response = await request(app)
        .get('/api/v1/products')
        .query({ sort: 'price' });

      expect(response.headers['content-type']).toMatch(/json/);
    });

    it('Should return a message with a status success and a list of products sorted without the __v property', async () => {
      const body1 = {
        name: 'Test name',
        price: 50,
        description: 'This is a test price',
        coverImage: './test',
        category: 'Umbrella',
      };
      const body2 = {
        name: 'Test name 2',
        price: 14,
        description: 'This is a test price 2',
        coverImage: './test2',
        category: 'Brushes',
      };
      const body3 = {
        name: 'Test name 3',
        price: 102,
        description: 'This is a test price 3',
        coverImage: './test3',
        category: 'Soap',
      };
      const productToBeFound1 = await request(app)
        .post('/api/v1/products')
        .send(body1);
      const productToBeFound2 = await request(app)
        .post('/api/v1/products')
        .send(body2);
      const productToBeFound3 = await request(app)
        .post('/api/v1/products')
        .send(body3);

      const response = await request(app)
        .get('/api/v1/products')
        .query({ sort: 'price' });

      delete productToBeFound1.body.data.doc.__v;
      delete productToBeFound2.body.data.doc.__v;
      delete productToBeFound3.body.data.doc.__v;

      const expectedMessage = {
        status: 'success',
        results: 3,
        data: {
          doc: [
            productToBeFound2.body.data.doc,
            productToBeFound1.body.data.doc,
            productToBeFound3.body.data.doc,
          ],
        },
      };

      expect(response.body).toEqual(expectedMessage);
    });
  });
});
