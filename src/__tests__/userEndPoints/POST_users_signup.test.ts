import app from '../../app';
import request from 'supertest';

describe('POST users/signup', () => {
  describe('when the request is valid', () => {
    it('It should return a status code of 201', async () => {
      const body = {
        username: 'dreadmill_gratis',
        email: 'dreadmill@gmail.com',
        password: 'heng1230@sjfl.',
        passwordConfirm: 'heng1230@sjfl.'
      };

      const response = await request(app)
        .post('/api/v1/users/signup')
        .send(body);

      expect(response.status).toBe(201);
    });
    it('It should return a status of success, the JWT token and the data of the user created', async () => {
      const body = {
        username: 'dreadmill_gratis',
        email: 'dreadmill@gmail.com',
        password: 'heng1230@sjfl.',
        passwordConfirm: 'heng1230@sjfl.'
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
            password: 'heng1230@sjfl.',
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
    });
  });
});
