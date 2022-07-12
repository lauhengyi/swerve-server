import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';

const testDBSetup = () => {
  // Connect to the in-memory database.
  const connect = async () => {
    if (!globalThis.__MONGOD__) {
      globalThis.__MONGOD__ = await MongoMemoryServer.create();
    }
    const uri = globalThis.__MONGOD__.getUri();
    await mongoose.connect(uri);
  };

  // Remove all the data for all db collections.
  const clearDatabase = async () => {
    const collections = mongoose.connection.collections;

    for (const key in collections) {
      const collection = collections[key];
      await collection.deleteMany({});
    }
  };

  // Drop database, close the connection and stop mongod.
  const closeDatabase = async () => {
    await mongoose.connection.dropDatabase();
    await mongoose.disconnect();
  };

  beforeAll(connect);
  afterEach(clearDatabase);
  afterAll(closeDatabase);
};

export default testDBSetup;
