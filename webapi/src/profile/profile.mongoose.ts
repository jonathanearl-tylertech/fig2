import mongoose from 'mongoose';

// mongoose schema
const profileSchema = new mongoose.Schema({
  email: String,
  name: String,
  username: String,
  summary: String,
  createdAt: Date,
  modifiedAt: Date,
});

export default mongoose.model('Profile', profileSchema);
