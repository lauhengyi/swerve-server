import app from '../../app';
import request from 'supertest';
import testDBSetup from '../../testUtils/testDBSetup';

testDBSetup();

describe('POST users/signup', () => {
  describe('When the request is valid', () => {
    it('It should return a status code of 201', async () => {
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

      expect(response.status).toBe(201);
    });
    it('It should return a status of success, the JWT token and the data of the user created, and the password is not stored as plain text', async () => {
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

      const expectedResponse = {
        status: 'success',
        token: expect.any(String),
        data: {
          user: {
            _id: expect.any(String),
            __v: expect.any(Number),
            username: 'dreadmill_gratis',
            email: 'dreadmill@gmail.com',
            password: expect.not.stringMatching(body.password),
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

  describe('When you try to create a user with an existing username', () => {
    it('It should return a status code of 400', async () => {
      const body = {
        username: 'dreadmill_gratis',
        email: 'dreadmill@gmail.com',
        password: 'heng1230@sjfl.',
        passwordConfirm: 'heng1230@sjfl.',
        accountType: 'regular',
      };
      const body2 = {
        username: 'dreadmill_gratis',
        email: 'mill@gmail.com',
        password: 'heng1230@sjfl.',
        passwordConfirm: 'heng1230@sjfl.',
        accountType: 'regular',
      };

      await request(app).post('/api/v1/users/signup').send(body);

      const response = await request(app)
        .post('/api/v1/users/signup')
        .send(body2);

      expect(response.status).toBe(400);
    });
    it('It should return a status of fail and a message stating the username that is taken', async () => {
      const body = {
        username: 'dreadmill_gratis',
        email: 'dreadmill@gmail.com',
        password: 'heng1230@sjfl.',
        passwordConfirm: 'heng1230@sjfl.',
        accountType: 'regular',
      };
      const body2 = {
        username: 'dreadmill_gratis',
        email: 'mill@gmail.com',
        password: 'heng1230@sjfl.',
        passwordConfirm: 'heng1230@sjfl.',
        accountType: 'regular',
      };

      await request(app).post('/api/v1/users/signup').send(body);

      const response = await request(app)
        .post('/api/v1/users/signup')
        .send(body2);

      const expectedMessage = {
        status: 'fail',
        message: 'The username, "dreadmill_gratis", is already taken.',
      };

      expect(response.body).toEqual(expectedMessage);
    });
  });
  describe('When you try to create a user with an invalid email', () => {
    it('It should return a status code of 400', async () => {
      const body = {
        username: 'dreadmill_gratis',
        email: 'dreadmillmail.com',
        password: 'heng1230@sjfl.',
        passwordConfirm: 'heng1230@sjfl.',
        accountType: 'regular',
      };

      const response = await request(app)
        .post('/api/v1/users/signup')
        .send(body);

      expect(response.status).toBe(400);
    });

    it('It should return a status of fail and a message "Invalid email."', async () => {
      const body = {
        username: 'dreadmill_gratis',
        email: 'dreadmillmail@com',
        password: 'heng1230@sjfl.',
        passwordConfirm: 'heng1230@sjfl.',
        accountType: 'regular',
      };

      const response = await request(app)
        .post('/api/v1/users/signup')
        .send(body);

      const expectedMessage = {
        status: 'fail',
        message: 'Invalid email.',
      };
      expect(response.body).toEqual(expectedMessage);
    });
  });
  describe('When you try to create a user with an existing email', () => {
    it('It should return a status code of 400', async () => {
      const body = {
        username: 'dreadmill_gratis',
        email: 'dreadmill@gmail.com',
        password: 'heng1230@sjfl.',
        passwordConfirm: 'heng1230@sjfl.',
        accountType: 'regular',
      };
      const body2 = {
        username: 'mill_gratis',
        email: 'dreadmill@gmail.com',
        password: 'heng1230@sjfl.',
        passwordConfirm: 'heng1230@sjfl.',
        accountType: 'regular',
      };

      await request(app).post('/api/v1/users/signup').send(body);

      const response = await request(app)
        .post('/api/v1/users/signup')
        .send(body2);

      expect(response.status).toBe(400);
    });

    it('It should return a status of fail and a message stating the email that is taken', async () => {
      const body = {
        username: 'dreadmill_gratis',
        email: 'dreadmill@gmail.com',
        password: 'heng1230@sjfl.',
        passwordConfirm: 'heng1230@sjfl.',
        accountType: 'regular',
      };
      const body2 = {
        username: 'mill_gratis',
        email: 'dreadmill@gmail.com',
        password: 'heng1230@sjfl.',
        passwordConfirm: 'heng1230@sjfl.',
        accountType: 'regular',
      };

      await request(app).post('/api/v1/users/signup').send(body);

      const response = await request(app)
        .post('/api/v1/users/signup')
        .send(body2);

      const expectedMessage = {
        status: 'fail',
        message: 'The email, "dreadmill@gmail.com", is already taken.',
      };

      expect(response.body).toEqual(expectedMessage);
    });
  });
  describe('When the password is not the same as the passwordConfirm', () => {
    it('It should return a status code of 400', async () => {
      const body = {
        username: 'dreadmill_gratis',
        email: 'dreadmill@gmail.com',
        password: 'heng1230@sjfl.',
        passwordConfirm: 'heng123@sjfl.',
        accountType: 'regular',
      };

      const response = await request(app)
        .post('/api/v1/users/signup')
        .send(body);

      expect(response.status).toBe(400);
    });

    it('It should return a status of fail and a message "Passwords are not the same."', async () => {
      const body = {
        username: 'dreadmill_gratis',
        email: 'dreadmill@gmail.com',
        password: 'heng1230@sjfl.',
        passwordConfirm: 'heng123@sjfl.',
        accountType: 'regular',
      };

      const response = await request(app)
        .post('/api/v1/users/signup')
        .send(body);

      const expectedMessage = {
        status: 'fail',
        message: 'Passwords are not the same.',
      };
      expect(response.body).toEqual(expectedMessage);
    });
  });
});
