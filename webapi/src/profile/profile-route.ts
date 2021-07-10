import express from 'express';
import Profile from './profile-schema'

const ProfileRoute = express.Router();

ProfileRoute.get('', async (req, res) => {
  const profiles = await Profile.find({}).exec();
  res.send(profiles);
});

export default ProfileRoute;