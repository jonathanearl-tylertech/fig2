import mongoose from 'mongoose';
import { IProfile } from './profile.model';

// mongoose schema
const profileSchema = new mongoose.Schema({
  email: String,
  name: String,
  username: String,
  summary: String,
  createdAt: Date,
  modifiedAt: Date,
});

export const ProfileDB = mongoose.model<IProfile>('Profile', profileSchema);