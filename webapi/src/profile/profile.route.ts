import express from 'express';
import profileService from './services/profileService';
import ICreateProfileRequest from './models/createProfileRequest';
import IUpdateProfile from './models/updateProfileRequest';
import CreateProfileValidation from './validation/createProfileValidation';
import UpdateProfileValidation from './validation/updateProfileValidation';
import { ConnectProfileDb } from './services/mongoose';

ConnectProfileDb()

const profileRoute = express.Router();

profileRoute.get('', async (req, res) => {
  console.log(`[profile] get all`);
  const profiles = await profileService.GetAll();
  console.log(`[profile] profiles: ${profiles}`);
  res.send(profiles);
});

profileRoute.get('/:username', async (req, res) => {
  const username = req.params.username;
  console.log(`[profile] get username: ${username}`);
  const profile = await profileService.Get(username);
  if (!profile) {
    console.log(`[profile] profile not found`);
    return res.sendStatus(404);
  }
  console.log(`[profile] profile:`, profile);
  res.send(profile);
});

profileRoute.put('/:username', async (req, res) => {
  const updateProfile: IUpdateProfile = req.body;
  const { error } = UpdateProfileValidation.validate(updateProfile);
  if (error) {
    console.log(`[profile] bad request: `, error);
    return res.status(400).send(error.message);
  }

  const username = req.params.username;
  
  const profile = await profileService.Update(username, updateProfile);
  if (!profile) {
    console.log('[profile] profile could not be found:', username);
    return res.status(400).send(`profile does not exist: ${username}`);
  }

  console.log(`[profile] updated profile: ${profile}`);
  res.send(profile);
})


profileRoute.post('/', async (req, res) => {
  const newProfile: ICreateProfileRequest = req.body;
  console.log(`[profile] create profile: `, newProfile);

  const { error } = CreateProfileValidation.validate(newProfile);
  if (error) {
    console.log(`[profile] bad request: `, error);
    return res.status(400).send(error.message);
  }

  const profile = await profileService.Create(newProfile);
  console.log("[profile] profile created:", profile);
  res.json(profile);
});


export default profileRoute;