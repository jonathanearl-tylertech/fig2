import express from 'express';
import { IProfile, IUpdateProfile } from './profile.model';
import { ProfileDB } from './profile.mongoose'
import { ProfileValidation, UpdateProfileValidation } from './profile.joi';


const ProfileRoute = express.Router();

ProfileRoute.get('', async (req, res) => {
  console.log(`[profile] get all`);
  const profiles: IProfile[] = await ProfileDB.find({}).exec();
  console.log(`[profile] profiles: ${profiles}`);
  res.send(profiles);
});

ProfileRoute.get('/:username', async (req, res) => {
  const username = req.params.username;
  console.log(`[profile] get username: ${username}`);
  const profile = await ProfileDB.findOne({ username }).exec();
  if (!profile) {
    console.log(`[profile] profile not found`);
    return res.sendStatus(404);
  }
  console.log(`[profile] profile: ${profile}`);
  res.send(profile);
});

ProfileRoute.put('/:username', async (req, res) => {
  const updateProfile: IUpdateProfile = req.body;
  const { error } = UpdateProfileValidation.validate(updateProfile);
  if (error) {
    console.log(`[profile] bad request: `, error);
    return res.status(400).send(error.message);
  }

  const username = req.params.username;
  
  const profile = await ProfileDB.findOneAndUpdate({ username }).exec();

  if (!profile) {
    console.log('[profile] profile could not be found:', username);
    return res.status(400).send(`profile does not exist: ${username}`);
  }

  console.log(`[profile] user found:`, profile);
  profile.name = updateProfile.name;
  profile.summary = updateProfile.summary;

  console.log(`[profile] profile: ${profile}`);
  res.send(profile);
})


ProfileRoute.post('/', async (req, res) => {
  const newProfile: IProfile = req.body;
  console.log(`[profile] create profile: `, newProfile);

  const { error } = ProfileValidation.validate(newProfile);
  if (error) {
    console.log(`[profile] bad request: `, error);
    return res.status(400).send(error.message);
  }

  const profile = new ProfileDB(newProfile);
  await profile.save();
  console.log("[profile] profile created:", profile);
  res.json(profile);
});


export default ProfileRoute;