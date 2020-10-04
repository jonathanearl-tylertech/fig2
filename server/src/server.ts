import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';


(async () => {
    await mongoose.connect('mongodb://db/fig', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true
    });


    const app = express();
    app.use(bodyParser.urlencoded({ extended: false }))
    app.use(bodyParser.json())

    app.post('/posts', (req, res) => {
        // console.log(req.body)
        // res.json(req.body)
        
    })

    app.listen(5001, () => {
        console.log('listening on 5001');
    });
})()
