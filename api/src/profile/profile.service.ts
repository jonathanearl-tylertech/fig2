import { Injectable, NotImplementedException } from '@nestjs/common';
import { Profile } from './entities/profile.entity';
import { ProfileModel } from './db/profile.model';

@Injectable()
export class ProfileService {

  async create(profile: Partial<Profile>): Promise<Profile> {
    const newProfile = new ProfileModel(profile);
    await newProfile.save()
    return newProfile.toObject();
  }

  async findAll(idList?: string[]): Promise<Profile[]> {
    let result: Profile[];
    if (idList) {
      result = await ProfileModel.find({ '_id': { $in: idList } })
    } else {
      result = await ProfileModel.find({}).lean();
    }
    return result;
  }

  async findOneById(id: string): Promise<Profile> {
    const profile = await ProfileModel.findOne({ _id: id }).lean();
    return profile;
  }

  async findOneByUid(uid: string): Promise<Profile> {
    const profile = await ProfileModel.findOne({'issuers.default': uid}).lean();
    return profile;
  }

  async findOneByUsername(username: string): Promise<Profile> {
    const profile = await ProfileModel.findOne({ username }).lean();
    return profile;
  }

  async update(updateProfile: Profile): Promise<Profile> {
    const profile = await ProfileModel.findOneAndUpdate(updateProfile).lean();
    return profile;
  }

  async remove(id: string) {
    throw new NotImplementedException();
  }
}
