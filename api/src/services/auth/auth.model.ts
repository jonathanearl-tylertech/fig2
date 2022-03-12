import mongoose from 'mongoose';

export class Identity {
  _id: string;
  username: string;
  passwordHash: string;
  lastLogin: Date;
  failedLoginAttempts: number;
  modifiedAt: Date;
  disabled: boolean;
  __v: number;
}

const identitySchema = new mongoose.Schema({
  username: String,
  profileImgUrl: String,
  issuer: String,
  lastLogin: Date,
  failedLoginAttempts: Number,
  modifiedAt: Date,
  disabled: Boolean,
});

export const IdentityModel = mongoose.model<Identity>('Profile', identitySchema);
