import mongoose from 'mongoose';

export class UserModel {
  _id: string;
  __v: number;
  disabled: boolean;
  email: string;
  failedLoginAttempts: number;
  image: string;
  lastLogin: Date;
  modifiedAt: Date;
  passwordHash: string;
  summary: string;
  username: string;
}

const UserModelSchema = new mongoose.Schema({
  disabled: Boolean,
  email: String,
  failedLoginAttempts: Number,
  image: String,
  lastLogin: Date,
  modifiedAt: Date,
  passwordHash: String,
  summary: String,
  username: String,
});

export const UserContext = mongoose.model<UserModel>('User', UserModelSchema);
