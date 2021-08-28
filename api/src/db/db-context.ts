import mongoose from 'mongoose';
import { DbSeeder } from './db-seeder';
import dotenv from 'dotenv';

dotenv.config();

const { MONGO_ADDRESS, MONGO_USERNAME, MONGO_PASSWORD, MONGO_TABLE } = process.env;
const connectionString = `mongodb://${MONGO_ADDRESS}/${MONGO_TABLE}`;
const dbSeeder = new DbSeeder();

class DbContext {
  async connect() {
    try {
      await mongoose.connect(
        connectionString,
        {
          useNewUrlParser: true,
          useUnifiedTopology: true,
          authSource: "admin",
          auth: {
            user: MONGO_USERNAME,
            password: MONGO_PASSWORD
          }
        }
      );
    } catch(err) {
      console.error('could not connect to db:', connectionString, err);
    }
  }

  async drop() {
    await dbSeeder.drop();
  }

  async seed() {
    await dbSeeder.seedPosts();
    await dbSeeder.seedProfiles();
  }
}

export const Db = new DbContext();