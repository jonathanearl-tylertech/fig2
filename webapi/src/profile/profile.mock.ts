import { IProfile } from "./profile.model";
import { ProfileDB } from "./profile.mongoose";

export const me: IProfile = {
  _id: "507f1f77bcf86cd799439011",
  email: "earl.jonathan@gmail.com",
  name: "jonathan earl",
  username: "whattheearl",
  summary: "just a small town boy, livinging in a hello world",
  createdAt: new Date(),
  modifiedAt: new Date(),
};

export const ImportMock = async () => {
  try {
    const exists = await ProfileDB.findById(me._id);
    if (exists) {
      console.log(`[mock] removing ${me.name}`);
      await exists.remove();
    }
    console.log(`[mock] seeding ${me.name}`);
    const profile = new ProfileDB(me);
    await profile.save();
    console.log(`[mock] ${me.name} created`);
  } catch (error) {
    console.log(`[mock] could not create ${me.name}`, error);
  }
}