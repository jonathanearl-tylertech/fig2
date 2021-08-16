import mongoose from 'mongoose';
import dotenv from 'dotenv';
import getRequiredEnv from '../../helpers/getRequiredEnv';
import Profile from '../models/profile';
import profileService from './profileService';

dotenv.config()

// mongoose schema
const profileSchema = new mongoose.Schema({
  email: String,
  name: String,
  username: String,
  summary: String,
  createdAt: Date,
  modifiedAt: Date,
});

export const Profile = mongoose.model<Profile>('Profile', profileSchema);

export const ConnectProfileDb = async () => {
  const PROFILE_MONGO_ADDRESS = getRequiredEnv('PROFILE_MONGO_ADDRESS');
  const PROFILE_MONGO_USERNAME = getRequiredEnv('PROFILE_MONGO_USERNAME');
  const PROFILE_MONGO_PASSWORD = getRequiredEnv('PROFILE_MONGO_PASSWORD');
  const PROFILE_TABLE = getRequiredEnv('PROFILE_TABLE');
  const connectionString = `mongodb://${PROFILE_MONGO_ADDRESS}/${PROFILE_TABLE}`;

  console.log('[db] connecting to:', connectionString)
  await mongoose.connect(
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

  await profileService.ImportMock();
}
