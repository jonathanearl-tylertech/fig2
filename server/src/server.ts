import express from 'express';
import bodyParser from 'body-parser';
import { connect } from 'mongoose';
import * as cors from 'cors';
import { User } from './models/User';
import { Post } from './models/Post';
import { Comment } from './models/Comment';

connect('mongodb://db/fig', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
});


const app = express();
app.use(cors.default())
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/posts', async (req, res) => {
    const posts = await Post.find().exec();
    res.json(posts);
});

app.get('/users', async (req, res) => {
    const users = await User.find().exec();
    res.json(users);
});

app.get('/users/:id', async (req, res) => {
    const { id } = req.params
    console.log(id);
    const user = await User.findById(id).exec();
    if (user === null) {
        return res.status(404);
    }
    res.json(user.toJSON());
});

app.post('/users', async (req, res) => {
    //validate
    const user = new User(req.body);
    user.save();
    res.json(user.toJSON());
});

app.listen(5001, () => console.log('listening on port 5001'));