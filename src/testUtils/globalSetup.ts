/* eslint-disable no-var */
import { MongoMemoryServer } from 'mongodb-memory-server';

declare global {
  var __MONGOD__: MongoMemoryServer;
}

module.exports = async () => {
  // Set environment variables
  process.env.JWT_SECRET = 'secret';
  process.env.JWT_EXPIRES_IN = '15min';
  console.log('I ran');

  // Connect to the in-memory database.
  if (!global.__MONGOD__) {
    globalThis.__MONGOD__ = await MongoMemoryServer.create();
  }
};
