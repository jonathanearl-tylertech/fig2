import { ICreateProfile } from "../models/create-profile";
import { IProfile } from "../models/profile";
import { IUpdateProfile } from "../models/update-profile";
import { Profile } from "./mongoose";


const GetAll = async (): Promise<IProfile[]> => {
  const profiles = await Profile.find({}).exec();
  return profiles.map(profile => profile.toObject());
}

const Get = async (username: string): Promise<IProfile | undefined> => {
  const profile = await Profile.findOne({ username }).exec();
  return profile?.toObject();
}

const Create = async (newProfile: ICreateProfile): Promise<IProfile> => {
  const profile = new Profile(newProfile);
  await profile.save();
  return profile.toObject();
}

const Update = async (username: string, updateProfile: IUpdateProfile): Promise<IProfile | undefined> => {
  const profile = await Profile.findOneAndUpdate({ username, ...updateProfile }).exec();
  return profile?.toObject();
}

const ImportMock = async () => {
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
    const exists = await Profile.findById(me._id);
    if (exists) {
      console.log(`[mock] removing ${me.name}`);
      await exists.remove();
    }
    console.log(`[mock] seeding ${me.name}`);
    const profile = new Profile(me);
    await profile.save();
    console.log(`[mock] ${me.name} created`);
  } catch (error) {
    console.log(`[mock] could not create ${me.name}`, error);
  }
}

export const ProfileDb = {
  GetAll,
  Get,
  Create,
  ImportMock,
  Update,
}