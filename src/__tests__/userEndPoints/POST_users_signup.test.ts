import app from '../../app';
import request from 'supertest';
import testDBSetup from '../../testUtils/testDBSetup';

testDBSetup();

describe('POST users/signup', () => {
  describe('When the request is valid', () => {
    it('It should return a status code of 201', async () => {
      // Environment variables
      process.env.JWT_SECRET = 'secret';
      process.env.JWT_EXPIRES_IN = '15min';
      const body = {
        username: 'dreadmill_gratis',
        email: 'dreadmill@gmail.com',
        password: 'heng1230@sjfl.',
        passwordConfirm: 'heng1230@sjfl.',
        accountType: 'regular'
      };

      const response = await request(app)
        .post('/api/v1/users/signup')
        .send(body);

      expect(response.status).toBe(201);
    });
    it('It should return a status of success, the JWT token and the data of the user created, and the password is not stored as plain text', async () => {
      // Environment variables
      process.env.JWT_SECRET = 'secret';
      process.env.JWT_EXPIRES_IN = '15min';
      const body = {
        username: 'dreadmill_gratis',
        email: 'dreadmill@gmail.com',
        password: 'heng1230@sjfl.',
        passwordConfirm: 'heng1230@sjfl.',
        accountType: 'regular'
      };

      const response = await request(app)
        .post('/api/v1/users/signup')
        .send(body);

      const expectedDoc = {
        status: 'success',
        token: expect.any(String),
        data: {
          doc: {
            _id: expect.any(String),
            __v: expect.any(Number),
            username: 'dreadmill_gratis',
            email: 'dreadmill@gmail.com',
            password: expect.any(String),
            profileImage: './default-profile-image.png',
            followedShops: [],
            accountType: 'regular',
            ownedShops: [],
            dateCreated: expect.any(String),
            isPublic: false,
            isAdmin: false
          }
        }
      };

      expect(response.body).toEqual(expectedDoc);
      expect(response.body.data.doc.password).not.toBe(body.password);
    });
  });

  describe('When you try to create a user with an existing username', () => {
    expect(1).toBe(1);
  });
  describe('When you try to create a user with an existing email', () => {
    expect(1).toBe(1);
  });
  describe('When the password is not the same as the passwordConfirm', () => {
    expect(1).toBe(1);
  });
});
