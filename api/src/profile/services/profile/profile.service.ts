import { Injectable } from '@nestjs/common';
import { MongooseContext } from '../mongoose-context/mongoose-context';
import { UpdateProfileDto } from '../../dto/update-profile.dto';
import { Profile } from '../../entities/profile.entity';
import { IProfileService } from './profile.service.interface';

@Injectable()
export class ProfileService implements IProfileService {
  private profileCtx;

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

  async findOne(username: string): Promise<Profile> {
    const profile = await this.profileCtx.findOne({ username }).exec();
    var result = profile?.toObject();
    return result;
  }

  async update(username: string, updateProfileDto: UpdateProfileDto): Promise<Profile> {
    await this.profileCtx.findOneAndUpdate({ username, ...updateProfileDto }).exec();
    const result = await this.profileCtx.findOne({ username }).exec()?.toObject();
    return result;
  }

  async remove(username: string) {
    return `This action removes a #${username} profile`;
  }

  async ImportMock() {
    const me: Profile = {
      _id: "507f1f77bcf86cd799439011",
      sub: 'anything',
      email: "earl.jonathan@gmail.com",
      name: "jonathan earl",
      username: "whattheearl",
      summary: "just a small town boy, livinging in a hello world",
      createdAt: new Date(),
      modifiedAt: new Date(),
    };
  
    try {
      const exists = await this.profileCtx.findById(me._id);
      if (exists) {
        console.log(`[mock] removing ${me.name}`);
        await exists.remove();
      }
      console.log(`[mock] seeding ${me.name}`);
      const profile = new this.profileCtx(me);
      await profile.save();
      console.log(`[mock] ${me.name} created`);
    } catch (error) {
      console.log(`[mock] could not create ${me.name}`, error);
    }
  }
}
