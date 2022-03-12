import mongoose from 'mongoose';

export class Profile {
  _id: string;
  username: string;
  email: string;
  image: string;
  summary: string;
  createdAt: Date;
  modifiedAt: Date;
  disabled: boolean;
  __v: number;
}

const profileSchema = new mongoose.Schema({
  username: String,
  email: String,
  image: String,
  summary: String,
  createdAt: Date,
  modifiedAt: Date,
  disabled: Boolean,
});

export const ProfileModel = mongoose.model<Profile>('Profile', profileSchema);