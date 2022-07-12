/* eslint-disable no-var */
import { MongoMemoryServer } from 'mongodb-memory-server';

declare global {
  var __MONGOD__: MongoMemoryServer;
}

module.exports = async () => {
  if (!global.__MONGOD__) {
    globalThis.__MONGOD__ = await MongoMemoryServer.create();
  }
};
