import app from '../../app';
import request from 'supertest';
import testDBSetup from '../../testUtils/testDBSetup';

testDBSetup();

describe('POST /products', () => {
  describe('when the request is valid', () => {
    it('Should have a status code 201', async () => {
      const body = {
        name: 'Test name',
        price: 10,
        description: 'This is a test price',
        coverImage: './test',
        category: 'Umbrella'
      };

      const response = await request(app).post('/api/v1/products').send(body);
      expect(response.status).toBe(201);
    });
  });

  it('Should return a content with a content-type of json', async () => {
    const body = {
      name: 'Test name',
      price: 10,
      description: 'This is a test price',
      coverImage: './test',
      category: 'Umbrella'
    };

    const response = await request(app).post('/api/v1/products').send(body);

    expect(response.headers['content-type']).toMatch(/json/);
  });

  it('Should return a message with a status success and the data of the created document ', async () => {
    const body = {
      name: 'Test name',
      price: 10,
      description: 'This is a test price',
      coverImage: './test',
      category: 'Umbrella'
    };

    const response = await request(app).post('/api/v1/products').send(body);

    expect(response.body.status).toBe('success');

    const expectedDoc = {
      _id: expect.any(String),
      __v: expect.any(Number),
      name: 'Test name',
      price: 10,
      description: 'This is a test price',
      coverImage: './test',
      images: [],
      category: 'Umbrella',
      dateUpdated: expect.any(Number)
    };
    expect(response.body.data.doc).toEqual(expectedDoc);
  });

  describe('When requested product to be created is invalid', () => {
    it('Should have a status code 400', async () => {
      const body = {
        test: 'error'
      };

      const response = await request(app).post('/api/v1/products').send(body);

      expect(response.status).toBe(400);
    });

    it('Should return a content with a content-type of json', async () => {
      const body = {
        test: 'error'
      };

      const response = await request(app).post('/api/v1/products').send(body);

      expect(response.headers['content-type']).toMatch(/json/);
    });

    it('Should respond with a status of "fail" and and a appropriate message', async () => {
      const body = {
        test: 'error'
      };

      const response = await request(app).post('/api/v1/products').send(body);

      const expectedMessage = {
        status: 'fail',
        message:
          'Product cover image is required. Product category is required. Product price is required. Product name is required.'
      };
      expect(response.body).toEqual(expectedMessage);
    });
  });
});
