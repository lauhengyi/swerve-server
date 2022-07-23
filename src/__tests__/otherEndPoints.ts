import app from '../app';
import request from 'supertest';

describe('Unhandled Endpoints', () => {
  describe('When given a request to an endpoint that does not exist', () => {
    it('Should have a status code 404', async () => {
      const unHandledEndPoints = [
        'api/v1/prcts/testID',
        'api/v1/products/testID/testID',
        'api/v1/askldhflaksjhfalsd',
        'api/asddf',
      ];

      for (const endPoint of unHandledEndPoints) {
        const response = await request(app).get(endPoint);

        expect(response.status).toBe(404);
      }

      for (const endPoint of unHandledEndPoints) {
        const response = await request(app).post(endPoint);

        expect(response.status).toBe(404);
      }

      for (const endPoint of unHandledEndPoints) {
        const response = await request(app).patch(endPoint);

        expect(response.status).toBe(404);
      }

      for (const endPoint of unHandledEndPoints) {
        const response = await request(app).delete(endPoint);

        expect(response.status).toBe(404);
      }
    });
    it('Should have a "fail" status and an appropriate message', async () => {
      const unHandledEndPoints = [
        'api/v1/prcts/testID',
        'api/v1/products/testID/testID',
        'api/v1/askldhflaksjhfalsd',
        'api/asddf',
      ];

      const expectedMessages = [
        'Cannot find api/v1/prcts/testID on this server.',
        'Cannot find api/v1/products/testID/testID on this server.',
        'Cannot find api/v1/askldhflaksjhfalsd on this server.',
        'Cannot find api/asddf on this server.',
      ];

      for (let i = 0; i < unHandledEndPoints.length; i++) {
        const response = await request(app).get(unHandledEndPoints[i]);

        expect(response.body.status).toBe('fail');
        expect(response.body.message).toBe(expectedMessages[i]);
      }

      for (let i = 0; i < unHandledEndPoints.length; i++) {
        const response = await request(app).post(unHandledEndPoints[i]);

        expect(response.body.status).toBe('fail');
        expect(response.body.message).toBe(expectedMessages[i]);
      }

      for (let i = 0; i < unHandledEndPoints.length; i++) {
        const response = await request(app).patch(unHandledEndPoints[i]);

        expect(response.body.status).toBe('fail');
        expect(response.body.message).toBe(expectedMessages[i]);
      }

      for (let i = 0; i < unHandledEndPoints.length; i++) {
        const response = await request(app).delete(unHandledEndPoints[i]);

        expect(response.body.status).toBe('fail');
        expect(response.body.message).toBe(expectedMessages[i]);
      }
    });
  });
});
