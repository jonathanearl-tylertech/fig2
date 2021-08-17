import express from 'express';
import ProfileService from './services/profile.service';
import ICreateProfileRequest from './models/ICreateProfileRequest';
import IUpdateProfile from './models/IUpdateProfileRequest';
import CreateProfileValidation from './validation/createProfileValidation';
import UpdateProfileValidation from './validation/updateProfileValidation';
import { ConnectProfileDb } from './services/mongoose';

ConnectProfileDb()

const profileRoute = express.Router();

profileRoute.get('', async (req, res) => {
  const profiles = await ProfileService.GetAll();

  res.json(profiles);
});

profileRoute.get('/:username', async (req, res) => {
  const username = req.params.username;

  const profile = await ProfileService.Get(username);

  if (!profile) {
    return res.sendStatus(404);
  }

  res.json(profile);
});

profileRoute.put('/:username', async (req, res) => {
  const updateProfile: IUpdateProfile = req.body;

  const { error } = UpdateProfileValidation.validate(updateProfile);
  if (error) {
    return res.status(400).send(error.message);
  }

  const username = req.params.username;
  
  const profile = await ProfileService.Update(username, updateProfile);

  if (!profile) {
    return res.status(404);
  }

  res.json(profile);
})


profileRoute.post('/', async (req, res) => {
  const newProfile: ICreateProfileRequest = req.body;

  const { error } = CreateProfileValidation.validate(newProfile);
  if (error) {
    return res.status(400).send(error.message);
  }

  const profile = await ProfileService.Create(newProfile);

  res.json(profile);
});


export default profileRoute;