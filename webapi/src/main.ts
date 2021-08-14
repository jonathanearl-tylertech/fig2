import express from 'express';
import profileRoute from './profile/profile.route';

const app = express();

// parse body as json
app.use(express.json());

// set up routes
app.use('/profile', profileRoute);

// start server
const server = app.listen('5000');
server.setTimeout(2000);