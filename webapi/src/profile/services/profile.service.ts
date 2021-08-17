import ICreateProfileRequest from "../models/ICreateProfileRequest";
import IProfile from "../models/IProfile";
import IUpdateProfile from "../models/IUpdateProfileRequest";
import { ProfileContext } from "./mongoose";
import IProfileService from "./IProfile.service";

class ProfileService implements IProfileService {

  public async GetAll(): Promise<IProfile[]> {
    const profiles = await ProfileContext.find({}).exec();
    return profiles.map(profile => profile.toObject());
  };

  public async Get(username: string): Promise<IProfile | undefined> {
    const profile = await ProfileContext.findOne({ username }).exec();
    return profile?.toObject();
  };
  
  public async Create(createProfileRequest: ICreateProfileRequest): Promise<IProfile> {
    const profile = new ProfileContext(createProfileRequest);
    await profile.save();
    return profile.toObject();
  };

  public async Update(username: string, updateProfile: IUpdateProfile): Promise<IProfile | undefined> {
    const profile = await ProfileContext.findOneAndUpdate({ username, ...updateProfile }).exec();
    return profile?.toObject();
  };

  public async ImportMock(): Promise<any> {
    const me: IProfile = {
      _id: "507f1f77bcf86cd799439011",
      email: "earl.jonathan@gmail.com",
      name: "jonathan earl",
      username: "whattheearl",
      summary: "just a small town boy, livinging in a hello world",
      createdAt: new Date(),
      modifiedAt: new Date(),
    };
  
    try {
      const exists = await ProfileContext.findById(me._id);
      if (exists) {
        console.log(`[mock] removing ${me.name}`);
        await exists.remove();
      }
      console.log(`[mock] seeding ${me.name}`);
      const profile = new ProfileContext(me);
      await profile.save();
      console.log(`[mock] ${me.name} created`);
    } catch (error) {
      console.log(`[mock] could not create ${me.name}`, error);
    }
  };
}

export default new ProfileService();