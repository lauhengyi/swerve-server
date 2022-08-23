import app from '../../app';
import request from 'supertest';
import testDBSetup from '../../testUtils/testDBSetup';

testDBSetup();

describe('GET /users/login', () => {
  describe('When a valid email and password is provided', () => {
    it('Should have a status code of 200', async () => {
      const user = {
        username: 'dreadmill_gratis',
        email: 'dreadmill@gmail.com',
        password: 'heng1230@sjfl.',
        passwordConfirm: 'heng1230@sjfl.',
        accountType: 'regular',
      };
      await request(app).post('/api/v1/users/signup').send(user);
      const body = {
        email: 'dreadmill@gmail.com',
        password: 'heng1230@sjfl.',
      };

      const response = await request(app).get('/api/v1/users/login').send(body);

      expect(response.statusCode).toBe(200);
    });

    it('Should respond with status of success, the jwt token of the logged in user, and the user data', async () => {
      const user = {
        username: 'dreadmill_gratis',
        email: 'dreadmill@gmail.com',
        password: 'heng1230@sjfl.',
        passwordConfirm: 'heng1230@sjfl.',
        accountType: 'regular',
      };
      await request(app).post('/api/v1/users/signup').send(user);
      const body = {
        email: 'dreadmill@gmail.com',
        password: 'heng1230@sjfl.',
      };

      const response = await request(app).get('/api/v1/users/login').send(body);

      const expectedResponse = {
        status: 'success',
        token: expect.any(String),
        data: {
          user: {
            _id: expect.any(String),
            __v: expect.any(Number),
            username: 'dreadmill_gratis',
            email: 'dreadmill@gmail.com',
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

    it('It should return a cookie with the jwt token that is secure, expires, httpOnly and sameSite', async () => {
      const body = {
        username: 'dreadmill_gratis',
        email: 'dreadmill@gmail.com',
        password: 'heng1230@sjfl.',
        passwordConfirm: 'heng1230@sjfl.',
        accountType: 'regular',
      };

      const response = await request(app)
        .post('/api/v1/users/signup')
        .send(body);

      expect(response.headers['set-cookie'][0]).toMatch(/jwt=/);
      expect(response.headers['set-cookie'][0]).toMatch(/Secure/);
      expect(response.headers['set-cookie'][0]).toMatch(/HttpOnly/);
      expect(response.headers['set-cookie'][0]).toMatch(/SameSite=Strict/);
    });
  });
  describe('When the email is not provided', () => {
    it('Should have a status code 400', async () => {
      const user = {
        username: 'dreadmill_gratis',
        email: 'dreadmill@gmail.com',
        password: 'heng1230@sjfl.',
        passwordConfirm: 'heng1230@sjfl.',
        accountType: 'regular',
      };
      await request(app).post('/api/v1/users/signup').send(user);
      const body = {
        password: 'heng1230@sjfl.',
      };

      const response = await request(app).get('/api/v1/users/login').send(body);

      expect(response.statusCode).toBe(400);
    });
    it('Should respond with a status of fail and a message of "Please provide an email and password."', async () => {
      const user = {
        username: 'dreadmill_gratis',
        email: 'dreadmill@gmail.com',
        password: 'heng1230@sjfl.',
        passwordConfirm: 'heng1230@sjfl.',
        accountType: 'regular',
      };
      await request(app).post('/api/v1/users/signup').send(user);
      const body = {
        password: 'heng1230@sjfl.',
      };

      const response = await request(app).get('/api/v1/users/login').send(body);

      const expectedMessage = {
        status: 'fail',
        message: 'Please provide an email and password.',
      };
      expect(response.body).toEqual(expectedMessage);
    });
  });
  describe('When the password is not provided', () => {
    it('Should have a status code 400', async () => {
      const user = {
        username: 'dreadmill_gratis',
        email: 'dreadmill@gmail.com',
        password: 'heng1230@sjfl.',
        passwordConfirm: 'heng1230@sjfl.',
        accountType: 'regular',
      };
      await request(app).post('/api/v1/users/signup').send(user);
      const body = {
        email: 'dreadmill@gmail.com',
      };

      const response = await request(app).get('/api/v1/users/login').send(body);

      expect(response.statusCode).toBe(400);
    });
    it('Should respond with a status of fail and a message of "Please provide an email and password."', async () => {
      const user = {
        username: 'dreadmill_gratis',
        email: 'dreadmill@gmail.com',
        password: 'heng1230@sjfl.',
        passwordConfirm: 'heng1230@sjfl.',
        accountType: 'regular',
      };
      await request(app).post('/api/v1/users/signup').send(user);
      const body = {
        email: 'dreadmill@gmail.com',
      };

      const response = await request(app).get('/api/v1/users/login').send(body);

      const expectedMessage = {
        status: 'fail',
        message: 'Please provide an email and password.',
      };
      expect(response.body).toEqual(expectedMessage);
    });
  });
  describe('When the email is incorrect', () => {
    it('Should have a status code of 401', async () => {
      const user = {
        username: 'dreadmill_gratis',
        email: 'dreadmill@gmail.com',
        password: 'heng1230@sjfl.',
        passwordConfirm: 'heng1230@sjfl.',
        accountType: 'regular',
      };
      await request(app).post('/api/v1/users/signup').send(user);
      const body = {
        email: 'dremill@gmail.com',
        password: 'heng1230@sjfl.',
      };

      const response = await request(app).get('/api/v1/users/login').send(body);

      expect(response.statusCode).toBe(401);
    });

    it('Should have a status of fail with a message of "Email or password is incorrect"', async () => {
      const user = {
        username: 'dreadmill_gratis',
        email: 'dreadmill@gmail.com',
        password: 'heng1230@sjfl.',
        passwordConfirm: 'heng1230@sjfl.',
        accountType: 'regular',
      };
      await request(app).post('/api/v1/users/signup').send(user);
      const body = {
        email: 'dremill@gmail.com',
        password: 'heng1230@sjfl.',
      };

      const response = await request(app).get('/api/v1/users/login').send(body);

      const expectedMessage = {
        status: 'fail',
        message: 'Email or password is incorrect.',
      };
      expect(response.body).toEqual(expectedMessage);
    });
  });

  describe('When the password is incorrect', () => {
    it('Should have a status code of 401', async () => {
      const user = {
        username: 'dreadmill_gratis',
        email: 'dreadmill@gmail.com',
        password: 'heng1230@sjfl.',
        passwordConfirm: 'heng1230@sjfl.',
        accountType: 'regular',
      };
      await request(app).post('/api/v1/users/signup').send(user);
      const body = {
        email: 'dreadmill@gmail.com',
        password: 'hng1230@sjfl.',
      };

      const response = await request(app).get('/api/v1/users/login').send(body);

      expect(response.statusCode).toBe(401);
    });

    it('Should have a status of fail with a message of "Email or password is incorrect"', async () => {
      const user = {
        username: 'dreadmill_gratis',
        email: 'dreadmill@gmail.com',
        password: 'heng1230@sjfl.',
        passwordConfirm: 'heng1230@sjfl.',
        accountType: 'regular',
      };
      await request(app).post('/api/v1/users/signup').send(user);
      const body = {
        email: 'dreadmill@gmail.com',
        password: 'heg1230@sjfl.',
      };

      const response = await request(app).get('/api/v1/users/login').send(body);

      const expectedMessage = {
        status: 'fail',
        message: 'Email or password is incorrect.',
      };
      expect(response.body).toEqual(expectedMessage);
    });
  });
});
