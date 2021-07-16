import Mongoose from 'mongoose';
import { IProfile } from './profile.model';
import { ImportMock } from './profile.mock';
import Dotenv from 'dotenv';
import { getRequiredEnv } from '../helpers/getRequiredEnv';

Dotenv.config()

// mongoose schema
const profileSchema = new Mongoose.Schema({
  email: String,
  name: String,
  username: String,
  summary: String,
  createdAt: Date,
  modifiedAt: Date,
});

export const ProfileDB = Mongoose.model<IProfile>('Profile', profileSchema);

export const ConnectProfileDb = async () => {
  const PROFILE_MONGO_ADDRESS = getRequiredEnv('PROFILE_MONGO_ADDRESS');
  const PROFILE_MONGO_USERNAME = getRequiredEnv('PROFILE_MONGO_USERNAME');
  const PROFILE_MONGO_PASSWORD = getRequiredEnv('PROFILE_MONGO_PASSWORD');
  const PROFILE_TABLE = getRequiredEnv('PROFILE_TABLE');
  const connectionString = `mongodb://${PROFILE_MONGO_ADDRESS}/${PROFILE_TABLE}`;

  console.log('[db] connecting to:', connectionString)
  // connect to db (shared for now)
  await Mongoose.connect(
    connectionString,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      authSource: "admin",
      auth: {
        user: PROFILE_MONGO_USERNAME,
        password: PROFILE_MONGO_PASSWORD
      }
    }
  )
  await ImportMock();
}
