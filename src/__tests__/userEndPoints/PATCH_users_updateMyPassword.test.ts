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

describe('PATCH /api/v1/users/updateMyPassword', () => {
  describe('When successfully authorized', () => {
    describe('When given a valid current password and valid new password and password Confirm', () => {
      it('Should have a status code of 200', async () => {
        const token = await signUpAndGetToken();
        const body = {
          currentPassword: 'heng1230@sjfl.',
          password: 'asdfjkldkjfl',
          passwordConfirm: 'asdfjkldkjfl',
        };

        const response = await request(app)
          .patch('/api/v1/users/updateMyPassword')
          .send(body)
          .set('Authorization', `Bearer ${token}`);

        expect(response.status).toBe(200);
      });

      it('Should return a status of success, a JWT token of the user and the user data', async () => {
        const token = await signUpAndGetToken();
        const body = {
          currentPassword: 'heng1230@sjfl.',
          password: 'asdfjkldkjfl',
          passwordConfirm: 'asdfjkldkjfl',
        };

        const response = await request(app)
          .patch('/api/v1/users/updateMyPassword')
          .send(body)
          .set('Authorization', `Bearer ${token}`);

        const expectedResponse = {
          status: 'success',
          token: expect.any(String),
          data: {
            user: {
              _id: expect.any(String),
              __v: expect.any(Number),
              username: 'test_helper',
              email: 'test@gmail.com',
              password: expect.any(String),
              profileImage: './default-profile-image.png',
              followedShops: [],
              accountType: 'regular',
              ownedShops: [],
              dateCreated: expect.any(Number),
              isPublic: false,
              isAdmin: false,
            },
          },
        };
        expect(response.body).toEqual(expectedResponse);
      });
    });

    describe('When not given the current password', () => {
      it('Should have a status code of 400', async () => {
        const token = await signUpAndGetToken();
        const body = {
          password: 'asdfjkldkjfl',
          passwordConfirm: 'asdfjkldkjfl',
        };

        const response = await request(app)
          .patch('/api/v1/users/updateMyPassword')
          .send(body)
          .set('Authorization', `Bearer ${token}`);

        expect(response.statusCode).toBe(400);
      });

      it('Should have a status of "fail" and a message of "Please provide your current password."', async () => {
        const token = await signUpAndGetToken();
        const body = {
          password: 'asdfjkldkjfl',
          passwordConfirm: 'asdfjkldkjfl',
        };

        const response = await request(app)
          .patch('/api/v1/users/updateMyPassword')
          .send(body)
          .set('Authorization', `Bearer ${token}`);

        const expectedResponse = {
          status: 'fail',
          message: 'Please provide your current password.',
        };
        expect(response.body).toEqual(expectedResponse);
      });
    });

    describe('When not given the new password', () => {
      it('Should have a status code of 400', async () => {
        const token = await signUpAndGetToken();
        const body = {
          currentPassword: 'heng1230@sjfl.',
          passwordConfirm: 'asdfjkldkjfl',
        };

        const response = await request(app)
          .patch('/api/v1/users/updateMyPassword')
          .send(body)
          .set('Authorization', `Bearer ${token}`);

        expect(response.statusCode).toBe(400);
      });

      it('Should have a status of "fail" and a message of "Please provide a new password."', async () => {
        const token = await signUpAndGetToken();
        const body = {
          currentPassword: 'heng1230@sjfl.',
          passwordConfirm: 'asdfjkldkjfl',
        };

        const response = await request(app)
          .patch('/api/v1/users/updateMyPassword')
          .send(body)
          .set('Authorization', `Bearer ${token}`);

        const expectedResponse = {
          status: 'fail',
          message: 'Please provide a new password.',
        };
        expect(response.body).toEqual(expectedResponse);
      });
    });

    describe('When not given the passwordConfirm', () => {
      it('Should have a status code of 400', async () => {
        const token = await signUpAndGetToken();
        const body = {
          currentPassword: 'heng1230@sjfl.',
          password: 'asdfjkldkjfl',
        };

        const response = await request(app)
          .patch('/api/v1/users/updateMyPassword')
          .send(body)
          .set('Authorization', `Bearer ${token}`);

        expect(response.statusCode).toBe(400);
      });

      it('Should have a status of "fail" and a message of "Please confirm your new password."', async () => {
        const token = await signUpAndGetToken();
        const body = {
          currentPassword: 'heng1230@sjfl.',
          password: 'asdfjkldkjfl',
        };

        const response = await request(app)
          .patch('/api/v1/users/updateMyPassword')
          .send(body)
          .set('Authorization', `Bearer ${token}`);

        const expectedResponse = {
          status: 'fail',
          message: 'Please confirm your new password.',
        };
        expect(response.body).toEqual(expectedResponse);
      });
    });

    describe('When given the wrong current password', () => {
      it('Should have a status code of 401', async () => {
        const token = await signUpAndGetToken();
        const body = {
          currentPassword: 'wrong password',
          password: 'asdfjkldkjfl',
          passwordConfirm: 'asdfjkldkjfl',
        };

        const response = await request(app)
          .patch('/api/v1/users/updateMyPassword')
          .send(body)
          .set('Authorization', `Bearer ${token}`);

        expect(response.status).toBe(401);
      });

      it('Should return a status of fail and a message of "Current password is incorrect."', async () => {
        const token = await signUpAndGetToken();
        const body = {
          currentPassword: 'wrong password',
          password: 'asdfjkldkjfl',
          passwordConfirm: 'asdfjkldkjfl',
        };

        const response = await request(app)
          .patch('/api/v1/users/updateMyPassword')
          .send(body)
          .set('Authorization', `Bearer ${token}`);

        const expectedResponse = {
          status: 'fail',
          message: 'Current password is incorrect.',
        };
        expect(response.body).toEqual(expectedResponse);
      });
    });

    describe('When the new password and password confirm do not match', () => {
      it('Should have a status code of 400', async () => {
        const token = await signUpAndGetToken();
        const body = {
          currentPassword: 'heng1230@sjfl.',
          password: 'asdfjkldkjfl',
          passwordConfirm: 'wrong password',
        };

        const response = await request(app)
          .patch('/api/v1/users/updateMyPassword')
          .send(body)
          .set('Authorization', `Bearer ${token}`);

        expect(response.status).toBe(400);
      });

      it('Should return a status of fail and a message of "Passwords are not the same."', async () => {
        const token = await signUpAndGetToken();
        const body = {
          currentPassword: 'heng1230@sjfl.',
          password: 'asdfjkldkjfl',
          passwordConfirm: 'wrong password',
        };

        const response = await request(app)
          .patch('/api/v1/users/updateMyPassword')
          .send(body)
          .set('Authorization', `Bearer ${token}`);

        const expectedResponse = {
          status: 'fail',
          message: 'Passwords are not the same.',
        };
        expect(response.body).toEqual(expectedResponse);
      });
    });
    describe('When not given a jwt token', () => {
      it('Should have a status code of 401', async () => {
        const response = await request(app).patch(
          '/api/v1/users/updateMyPassword',
        );

        expect(response.status).toBe(401);
      });

      it('Should respond with a status of "fail" and a message of "You are not logged in. Please log in perform this operation."', async () => {
        const response = await request(app).patch(
          '/api/v1/users/updateMyPassword',
        );

        const expectedMessage = {
          status: 'fail',
          message:
            'You are not logged in. Please log in perform this operation.',
        };
        expect(response.body).toEqual(expectedMessage);
      });
    });

    describe('When given a invalid token', () => {
      it('Should have a status code of 401', async () => {
        const token =
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c';
        const response = await request(app)
          .patch('/api/v1/users/updateMyPassword')
          .set('Authorization', `Bearer ${token}`);

        expect(response.status).toBe(401);
      });

      it('Should respond with a status of "fail" and a message of "Invalid token"', async () => {
        const token =
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c';
        const response = await request(app)
          .patch('/api/v1/users/updateMyPassword')
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
          .patch('/api/v1/users/updateMyPassword')
          .set('Authorization', `Bearer ${token}`);

        expect(response.status).toBe(401);
      });

      it('Should respond with a status of "fail" and a message of "Token has expired."', async () => {
        // Shorten the token's expiry time
        process.env.JWT_EXPIRES_IN = '1';

        const token = await signUpAndGetToken();

        const response = await request(app)
          .patch('/api/v1/users/updateMyPassword')
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
          .patch('/api/v1/users/updateMyPassword')
          .set('Authorization', `Bearer ${token}`);

        expect(response.status).toBe(401);
      });

      it('Should respond with a status of "fail" and a message of "The user that this token belongs to no longer exists."', async () => {
        const token = await signUpAndGetToken();
        await request(app)
          .delete('/api/v1/users/deleteMe')
          .set('Authorization', `Bearer ${token}`);

        const response = await request(app)
          .patch('/api/v1/users/updateMyPassword')
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
});
