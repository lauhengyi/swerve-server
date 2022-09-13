import testDBSetup from '../../testUtils/testDBSetup';
import request from 'supertest';
import app from '../../app';

testDBSetup();

describe('Parameter pollution', () => {
  describe('When given a request with 2 sort parameters', () => {
    it('Should only use the last sort parameter', async () => {
      await request(app).post('/api/v1/products').send({
        name: 'A product',
        price: 20,
        description: 'This is a test description',
        coverImage: './test',
        category: 'Umbrella',
      });
      await request(app).post('/api/v1/products').send({
        name: 'B product',
        price: 10,
        description: 'This is a test description',
        coverImage: './test',
        category: 'Umbrella',
      });
      const response = await request(app).get(
        '/api/v1/products?sort=price&sort=name',
      );

      expect(response.body.data.doc[0].name).toBe('A product');
    });
  });
});
