import express from 'express';
import bodyParser from 'body-parser';
import { connect } from 'mongoose';
import * as cors from 'cors';
import { Post } from './models/Post';
import { Author, IAuthor } from './models/Author';

(async () => {
    await connect('mongodb://db/fig', {
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
        const posts = await Post.find();
        console.log(posts[0]);
        res.json(posts);
    });

    app.get('/authors', async (req, res) => {
        const authors = await Author.find();
        const response = authors
            .map(authors => authors.toJSON())
            .map((author: IAuthor) => { 
                return { 
                    id: author._id,
                    name: author.name,
                    createdAt: author.createdAt,
                    message: author.message,
                    email: author.email
                } as IAuthor
            })
        res.json(response); 
    });

    app.get('/authors/:id', async (req, res) => {
        const { id } = req.params
        console.log(id);
        const author = await Author.findById(id);
        if (author === null) {
            return res.status(404).send("no author found")
        }
        res.json(author?.toJSON()); 
    });

    app.post('/authors', async (req, res) => {
        //validate
        const author = new Author(req.body);
        console.log(author.id);
        // author.save();
        console.log(author.id);
        res.json(author.toJSON());
    });

    app.listen(5001, () => {
        console.log('listening on 5001');
    });
})()
