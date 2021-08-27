import { Injectable } from '@nestjs/common';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { Profile } from '../entities/profile.entity';

dotenv.config()

const profileSchema = new mongoose.Schema({
  email: String,
  name: String,
  username: String,
  summary: String,
  createdAt: Date,
  modifiedAt: Date,
}, {
  toObject: {
    transform: function (doc, ret) {
      ret.id = ret._id;
      delete ret._id;
    }
  },
  toJSON: {
    transform: function (doc, ret) {
      ret.id = ret._id;
      delete ret._id;
    }
  }
});

@Injectable()
export class MongooseContext {
  public ProfileContext: mongoose.Model<Profile>;

  constructor() {
    const { PROFILE_MONGO_ADDRESS, PROFILE_MONGO_USERNAME, PROFILE_MONGO_PASSWORD, PROFILE_TABLE } = process.env;
    const connectionString = `mongodb://${PROFILE_MONGO_ADDRESS}/${PROFILE_TABLE}`;

    console.log('[db] connecting to:', connectionString)
    mongoose.connect(
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
    this.ProfileContext = mongoose.model<Profile>('Profile', profileSchema);
  }
}
