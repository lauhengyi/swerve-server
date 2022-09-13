import app from '../../app';
import request from 'supertest';
import testDBSetup from '../../testUtils/testDBSetup';

testDBSetup();

describe('Data sanitization', () => {
  describe('When given a body with a malicious mongoDB query injection', () => {
    it('Should remove the $ sign from the body', async () => {
      const response = await request(app)
        .get('/api/v1/users/login')
        .send({
          email: { $gt: '' },
          password: 'password',
        });

      // Query becomes invalid as input is sanitized
      expect(response.body).toEqual({
        status: 'fail',
        message: 'Invalid email: [object Object].',
      });
    });
  });

  describe('When given a body with a malicious XSS attack', () => {
    it('Should remove any html tags from the input', async () => {
      const response = await request(app).post('/api/v1/users/signup').send({
        username: '<div id="bad-code its a bunch of bad code">name</div>',
        email: 'test@gmail.com',
        password: 'heng1230@sjfl.',
        passwordConfirm: 'heng1230@sjfl.',
        accountType: 'regular',
      });
      expect(response.body.data.user.username).toBe('<div>name</div>');
    });
  });
});
