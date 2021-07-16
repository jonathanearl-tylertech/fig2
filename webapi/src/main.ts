import Express from 'express';
import { ConnectProfileDb } from './profile/profile.mongoose';
import ProfileRoute from './profile/profile.route';

ConnectProfileDb()

const app = Express();

// parse body as json
app.use(Express.json());

// set up routes
app.use('/profile', ProfileRoute);

const server = app.listen('5000');
server.setTimeout(2000);