import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';

const testDBSetup = () => {
  let mongod: MongoMemoryServer;
  // Connect to the in-memory database.
  const connect = async () => {
    mongod = await MongoMemoryServer.create();
    const uri = mongod.getUri();
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
    await mongod.stop();
  };

  beforeAll(connect);
  afterEach(clearDatabase);
  afterAll(closeDatabase);
};

export default testDBSetup;
