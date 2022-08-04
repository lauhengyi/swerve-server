import app from '../../app';
import request from 'supertest';
import testJWTAuth from '../testHelpers/testJWTAuth';
import testDBSetup from '../../testUtils/testDBSetup';

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

describe('DELETE /users/deleteMe', () => {
  describe('When successfully authorized', () => {
    it('Should have a status code 204', async () => {
      const token = await signUpAndGetToken();

      const response = await request(app)
        .delete(`/api/v1/users/deleteMe`)
        .set('Authorization', `Bearer ${token}`);

      expect(response.status).toBe(204);
    });

    it('Should return no content', async () => {
      const token = await signUpAndGetToken();

      const response = await request(app)
        .delete(`/api/v1/users/deleteMe`)
        .set('Authorization', `Bearer ${token}`);

      expect(response.body).toEqual({});
    });
  });

  testJWTAuth('delete', '/api/v1/users/deleteMe');
});
