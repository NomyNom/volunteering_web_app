const mongoose = require("mongoose");
const { MongoMemoryServer } = require("mongodb-memory-server");

let mongo;

beforeAll(async () => {
  jest.setTimeout(30000);
  mongo = await MongoMemoryServer.create();
  await mongoose.connect(mongo.getUri(), { });
});

afterEach(async () => {
  for (const coll of Object.values(mongoose.connection.collections)) {
    await coll.deleteMany();
  }
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongo.stop();
});
