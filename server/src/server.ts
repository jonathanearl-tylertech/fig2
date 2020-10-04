import express from 'express';
import bodyParser from 'body-parser';
import { connect } from 'mongoose';

import { Post } from './models/Post';
import { Author } from './models/Author';

(async () => {
    await connect('mongodb://db/fig', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true
    });


    const app = express();
    app.use(bodyParser.urlencoded({ extended: false }))
    app.use(bodyParser.json())

    app.get('/posts', async (req, res) => {
        // const author = await new Author({ name: 'fred', email: 'earl.jonathan@gmail.com', message: 'i want it that way, tell me why'})
        //     .save()
        // console.log(author);
        const authors = await Author.find()
        res.json(authors);
    })

    app.listen(5001, () => {
        console.log('listening on 5001');
    });
})()
