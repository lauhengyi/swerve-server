/* eslint-disable no-var */
import { MongoMemoryServer } from 'mongodb-memory-server';

declare global {
  var __MONGOD__: MongoMemoryServer;
}

module.exports = async () => {
  // Connect to the in-memory database.
  if (!global.__MONGOD__) {
    globalThis.__MONGOD__ = await MongoMemoryServer.create();
  }
};
