import express from 'express';
import { ProfileDb } from './db/db';
import { ICreateProfile } from './models/create-profile';
import { IUpdateProfile } from './models/update-profile';
import { CreateProfileValidation } from './validation/create-profile';
import { UpdateProfileValidation } from './validation/update-profile';
import { ConnectProfileDb } from './db/mongoose';

ConnectProfileDb()

const ProfileRoute = express.Router();

ProfileRoute.get('', async (req, res) => {
  console.log(`[profile] get all`);
  const profiles = await ProfileDb.GetAll();
  console.log(`[profile] profiles: ${profiles}`);
  res.send(profiles);
});

ProfileRoute.get('/:username', async (req, res) => {
  const username = req.params.username;
  console.log(`[profile] get username: ${username}`);
  const profile = await ProfileDb.Get(username);
  if (!profile) {
    console.log(`[profile] profile not found`);
    return res.sendStatus(404);
  }
  console.log(`[profile] profile:`, profile);
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
  
  const profile = await ProfileDb.Update(username, updateProfile);
  if (!profile) {
    console.log('[profile] profile could not be found:', username);
    return res.status(400).send(`profile does not exist: ${username}`);
  }

  console.log(`[profile] updated profile: ${profile}`);
  res.send(profile);
})


ProfileRoute.post('/', async (req, res) => {
  const newProfile: ICreateProfile = req.body;
  console.log(`[profile] create profile: `, newProfile);

  const { error } = CreateProfileValidation.validate(newProfile);
  if (error) {
    console.log(`[profile] bad request: `, error);
    return res.status(400).send(error.message);
  }

  const profile = await ProfileDb.Create(newProfile);
  console.log("[profile] profile created:", profile);
  res.json(profile);
});


export default ProfileRoute;