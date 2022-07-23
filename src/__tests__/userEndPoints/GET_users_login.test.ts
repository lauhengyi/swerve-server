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
    it('Should respond with status of success, and the jwt token of the logged in user', async () => {
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

      const expectedMessage = {
        status: 'success',
        token: expect.any(String),
      };
      expect(response.body).toEqual(expectedMessage);
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
