import app from '../../app';
import request from 'supertest';
import testDBSetup from '../../testUtils/testDBSetup';
import testJWTAuth from '../testHelpers/testJWTAuth';

testDBSetup();

const signUpAndGetToken = async () => {
  const user = {
    username: 'test_helper',
    email: 'test@gmail.com',
    password: 'heng1230@sjfl.',
    passwordConfirm: 'heng1230@sjfl.',
    accountType: 'regular',
  };
  const response = await request(app).post('/api/v1/users/signup').send(user);
  return response.body.token;
};

describe('DELETE /products/:id', () => {
  describe('When successfully authorized', () => {
    describe('When the id is valid and exists', () => {
      it('Should have a status code 204', async () => {
        const token = await signUpAndGetToken();
        // Add product into database
        const body = {
          name: 'Test name',
          price: 10,
          description: 'This is a test price',
          coverImage: './test',
          category: 'Umbrella',
        };
        const productToBeDeleted = await request(app)
          .post('/api/v1/products')
          .set('Authorization', `Bearer ${token}`)
          .send(body);

        const response = await request(app)
          .delete(`/api/v1/products/${productToBeDeleted.body.data.doc._id}`)
          .set('Authorization', `Bearer ${token}`);

        expect(response.status).toBe(204);
      });

      it('Should return no content', async () => {
        const token = await signUpAndGetToken();
        // Add product into database
        const body = {
          name: 'Test name',
          price: 10,
          description: 'This is a test price',
          coverImage: './test',
          category: 'Umbrella',
        };
        const productToBeDeleted = await request(app)
          .post('/api/v1/products')
          .set('Authorization', `Bearer ${token}`)
          .send(body);

        const response = await request(app)
          .delete(`/api/v1/products/${productToBeDeleted.body.data.doc._id}`)
          .set('Authorization', `Bearer ${token}`);

        expect(response.body).toEqual({});
      });
    });

    describe('When the id is valid but does not exist', () => {
      it('Should have a status code 404', async () => {
        const token = await signUpAndGetToken();
        const response = await request(app)
          .delete('/api/v1/products/507f1f77bcf86cd799439011')
          .set('Authorization', `Bearer ${token}`);

        expect(response.status).toBe(404);
      });

      it('Should respond with a status of "fail" and a message of "No document found with this ID"', async () => {
        const token = await signUpAndGetToken();
        const response = await request(app)
          .delete('/api/v1/products/507f1f77bcf86cd799439011')
          .set('Authorization', `Bearer ${token}`);

        const expectedMessage = {
          status: 'fail',
          message: 'No document found with this ID.',
        };
        expect(response.body).toEqual(expectedMessage);
      });
    });
    describe('When the id is invalid', () => {
      it('Should have a status code of 400', async () => {
        const token = await signUpAndGetToken();
        const response = await request(app)
          .delete('/api/v1/products/invalidId')
          .set('Authorization', `Bearer ${token}`);

        expect(response.status).toBe(400);
      });

      it('Should respond with a status of "fail" and a message of "Invalid id: ${invalidId}"', async () => {
        const token = await signUpAndGetToken();
        const response = await request(app)
          .delete('/api/v1/products/invalidId')
          .set('Authorization', `Bearer ${token}`);

        const expectedMessage = {
          status: 'fail',
          message: 'Invalid _id: invalidId.',
        };
        expect(response.body).toEqual(expectedMessage);
      });
    });
  });

  describe('When given a valid token but the user does not own the product', () => {
    it.todo('Should have a status code of 403');

    it.todo(
      'Should respond with a status of "fail" and a message of "You do not have permission to perform this operation."',
    );
  });

  testJWTAuth('delete', '/api/v1/products/507f1f77bcf86cd799439011');
});
