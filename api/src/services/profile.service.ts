import { Injectable, NotImplementedException } from '@nestjs/common';
import { MongooseContext } from './mongoose-context';
import { Profile } from '../entities/profile.entity';
import { Model } from 'mongoose';

@Injectable()
export class ProfileService {
  private profileCtx: Model<Profile, {}, {}>;

  constructor(private readonly mongoose: MongooseContext) {
    this.profileCtx = this.mongoose.ProfileContext;
  }

  async create(profile: Partial<Profile>): Promise<Profile> {
    const newProfile = new this.profileCtx(profile);
    await newProfile.save();
    return newProfile.toObject();
  }

  async findAll(): Promise<Profile[]> {
    const profiles = await this.profileCtx.find({}).exec();
    return profiles.map(profile => profile.toObject());
  }

  async findOneById(id: string): Promise<Profile> {
    const profile = await this.profileCtx.findOne({ _id: id }).exec();
    const result = profile?.toObject();
    return result;
  }

  async findOneByUid(uid: string): Promise<Profile> {
    const profile = await this.profileCtx.findOne({'issuers.default': uid}).exec();
    const result = profile?.toObject();
    return result;
  }

  async findOneByUsername(username: string): Promise<Profile> {
    const profile = await this.profileCtx.findOne({ username }).exec();
    const result = profile?.toObject();
    return result;
  }

  async update(updateProfile: Profile): Promise<Profile> {
    await this.profileCtx.findOneAndUpdate(updateProfile).exec();
    const profile = await this.profileCtx.findOne({ _id: updateProfile._id }).exec();
    const result = profile?.toObject();
    return result;
  }

  async remove(id: string) {
    throw new NotImplementedException();
  }
}
