import mongoose from 'mongoose';

export async function connectToMongoDB() {
  await mongoose.connect(process.env.DB_CONNECT_URI, {
    dbName: process.env.DB_NAME,
    auth: {
      password: process.env.DB_PASSWORD,
      username: process.env.DB_USERNAME,
    },
    authSource: process.env.DB_AUTH_SOURCE,
  });
}
