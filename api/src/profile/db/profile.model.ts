import { Injectable } from '@nestjs/common';
import mongoose from 'mongoose';
import { Profile } from '../entities/profile.entity';


const profileSchema = new mongoose.Schema({
  username: String,
  issuer: { 'default': String },
  summary: String,
  createdAt: Date,
  modifiedAt: Date,
});

export const ProfileModel = mongoose.model<Profile>('Profile', profileSchema);