import express from 'express';
import mongoose from 'mongoose';
import ProfileRoute from './profile/profile.route';

// connect to db (shared for now)
mongoose.connect(
  'mongodb://localhost:27017/fig', 
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    authSource: "admin",
    auth: {
      user: "admin",
      password: "admin"
    }
  }
)

const app = express();

// parse body as json
app.use(express.json());

// set up routes
app.use('/profile', ProfileRoute);

const server = app.listen('5000');
server.setTimeout(2000);