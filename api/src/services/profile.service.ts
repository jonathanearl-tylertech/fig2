import { Injectable, NotImplementedException } from '@nestjs/common';
import { MongooseContext } from './mongoose-context';
import { UpdateProfileDto } from '../dto/update-profile.dto';
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
    return newProfile?.toObject();
  }

  async findAll(): Promise<Profile[]> {
    const profiles = await this.profileCtx.find({}).exec();
    return profiles.map(profile => profile.toObject());
  }

  async findOne(id: string): Promise<Profile> {
    const profile = await this.profileCtx.findOne({ _id: id }).exec();
    const result = profile?.toObject();
    return result;
  }

  async findOneByUid(uid: string, issuer: string): Promise<Profile> {
    const profile = await this.profileCtx.findOne({ issuer: { [issuer]: uid } }).exec();
    const result = profile?.toObject();
    return result;
  }

  async findOneByUsername(username: string): Promise<Profile> {
    const profile = await this.profileCtx.findOne({ username }).exec();
    const result = profile?.toObject();
    return result;
  }

  async update(username: string, updateProfileDto: UpdateProfileDto): Promise<Profile> {
    throw new NotImplementedException();
    // await this.profileCtx.findOneAndUpdate({ username, ...updateProfileDto }).exec();
    // const profile = await this.profileCtx.findOne({ username }).exec();
    // const result = profile?.toObject();
    // return result;
  }

  async remove(username: string) {
    return `This action removes a #${username} profile`;
  }

  async ImportMock() {
    const me: Partial<Profile> = {
      _id: "507f1f77bcf86cd799439011",
      issuer: { 'https://dev-840204.okta.com/oauth2/default': '00u3wmcpnofpVOsp24x7' },
      username: "whattheearl",
      summary: "just a small town boy, livinging in a hello world",
      createdAt: new Date(),
      modifiedAt: new Date(),
    };
  
    try {
      const exists = await this.profileCtx.findById(me._id);
      if (exists) {
        console.log(`[mock] removing ${me.username}`);
        await exists.remove();
      }
      console.log(`[mock] seeding ${me.username}`);
      const profile = new this.profileCtx(me);
      await profile.save();
      console.log(`[mock] ${me.username} created`);
    } catch (error) {
      console.log(`[mock] could not create ${me.username}`, error);
    }
  }
}
