import mongoose from 'mongoose';

const profileSchema = new mongoose.Schema({
  id: String,
  email: String,
  name: String,
  username: String,
  summary: String,
  createdAt: Date,
  modifiedAt: Date,
});

export default mongoose.model('Profile', profileSchema);
