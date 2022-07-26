import app from '../../app';
import request from 'supertest';
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

  describe('When not given a jwt token', () => {
    it('Should have a status code of 401', async () => {
      const response = await request(app).delete('/api/v1/users/deleteMe');

      expect(response.status).toBe(401);
    });

    it('Should respond with a status of "fail" and a message of "You are not logged in. Please log in perform this operation."', async () => {
      const response = await request(app).delete('/api/v1/users/deleteMe');

      const expectedMessage = {
        status: 'fail',
        message: 'You are not logged in. Please log in perform this operation.',
      };
      expect(response.body).toEqual(expectedMessage);
    });
  });

  describe('When given a invalid token', () => {
    it('Should have a status code of 401', async () => {
      const token =
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c';
      const response = await request(app)
        .delete('/api/v1/users/deleteMe')
        .set('Authorization', `Bearer ${token}`);

      expect(response.status).toBe(401);
    });

    it('Should respond with a status of "fail" and a message of "Invalid token"', async () => {
      const token =
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c';
      const response = await request(app)
        .delete('/api/v1/users/deleteMe')
        .set('Authorization', `Bearer ${token}`);

      const expectedMessage = {
        status: 'fail',
        message: 'Invalid token.',
      };
      expect(response.body).toEqual(expectedMessage);
    });
  });

  describe('When given an expired token', () => {
    it('Should have a status code of 401', async () => {
      // Shorten the token's expiry time
      process.env.JWT_EXPIRES_IN = '1';

      const token = await signUpAndGetToken();

      const response = await request(app)
        .delete('/api/v1/users/deleteMe')
        .set('Authorization', `Bearer ${token}`);

      expect(response.status).toBe(401);
    });

    it('Should respond with a status of "fail" and a message of "Token has expired."', async () => {
      // Shorten the token's expiry time
      process.env.JWT_EXPIRES_IN = '1';

      const token = await signUpAndGetToken();

      const response = await request(app)
        .delete('/api/v1/users/deleteMe')
        .set('Authorization', `Bearer ${token}`);

      const expectedMessage = {
        status: 'fail',
        message: 'Token has expired.',
      };

      expect(response.body).toEqual(expectedMessage);
    });
  });

  describe('When the token is for a deleted user', () => {
    it('Should have a status code of 401', async () => {
      const token = await signUpAndGetToken();
      await request(app)
        .delete('/api/v1/users/deleteMe')
        .set('Authorization', `Bearer ${token}`);

      const response = await request(app)
        .delete('/api/v1/users/deleteMe')
        .set('Authorization', `Bearer ${token}`);

      expect(response.status).toBe(401);
    });

    it('Should respond with a status of "fail" and a message of "The user that this token belongs to no longer exists."', async () => {
      const token = await signUpAndGetToken();
      await request(app)
        .delete('/api/v1/users/deleteMe')
        .set('Authorization', `Bearer ${token}`);

      const response = await request(app)
        .delete('/api/v1/users/deleteMe')
        .set('Authorization', `Bearer ${token}`);

      const expectedMessage = {
        status: 'fail',
        message: 'The user that this token belongs to no longer exists.',
      };
      expect(response.body).toEqual(expectedMessage);
    });
  });

  describe('When the token is for a old user that now has a different password', () => {
    it.todo('Should have a status code of 401');

    it.todo(
      'Should respond with a status of "fail" and a message of "Password has changed, please log in again"',
    );
  });
});
