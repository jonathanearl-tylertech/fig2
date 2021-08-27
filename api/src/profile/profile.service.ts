import { Injectable, NotImplementedException } from '@nestjs/common';
import { Profile } from './entities/profile.entity';
import { ProfileModel } from './db/profile.model';

@Injectable()
export class ProfileService {

  async create(profile: Partial<Profile>): Promise<Profile> {
    const newProfile = new ProfileModel(profile);
    await newProfile.save();
    return newProfile.toObject();
  }

  async findAll(): Promise<Profile[]> {
    const profiles = await ProfileModel.find({}).exec();
    return profiles.map(profile => profile.toObject());
  }

  async findOneById(id: string): Promise<Profile> {
    const profile = await ProfileModel.findOne({ _id: id }).exec();
    const result = profile?.toObject();
    return result;
  }

  async findOneByUid(uid: string): Promise<Profile> {
    const profile = await ProfileModel.findOne({'issuers.default': uid}).exec();
    const result = profile?.toObject();
    return result;
  }

  async findOneByUsername(username: string): Promise<Profile> {
    const profile = await ProfileModel.findOne({ username }).exec();
    const result = profile?.toObject();
    return result;
  }

  async update(updateProfile: Profile): Promise<Profile> {
    await ProfileModel.findOneAndUpdate(updateProfile).exec();
    const profile = await ProfileModel.findOne({ _id: updateProfile._id }).exec();
    const result = profile?.toObject();
    return result;
  }

  async remove(id: string) {
    throw new NotImplementedException();
  }
}
