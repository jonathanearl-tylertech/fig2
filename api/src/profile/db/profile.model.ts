import mongoose from 'mongoose';
import { Profile } from '../entities/profile.entity';

const Issuer = new mongoose.Schema({
  default: String
});

const profileSchema = new mongoose.Schema({
  username: String,
  profileImgUrl: String,
  issuers: Issuer,
  summary: String,
  createdAt: Date,
  modifiedAt: Date,
});

export const ProfileModel = mongoose.model<Profile>('Profile', profileSchema);