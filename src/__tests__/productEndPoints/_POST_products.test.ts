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
    expect(response.body.data.doc).toHaveProperty('_id');
    expect(response.body.data.doc).toHaveProperty('__v');
    expect(response.body.data.doc).toHaveProperty('dateUpdated');
    delete response.body.data.doc._id;
    delete response.body.data.doc.__v;
    delete response.body.data.doc.dateUpdated;

    const expectedDoc = {
      name: 'Test name',
      price: 10,
      description: 'This is a test price',
      coverImage: './test',
      images: [],
      category: 'Umbrella'
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
          'Product validation failed: coverImage: Product cover image is required, category: Product category is required, price: Product price is required, name: Product name is required'
      };
      expect(response.body).toEqual(expectedMessage);
    });
  });
});
