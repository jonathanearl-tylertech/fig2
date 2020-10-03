import express from 'express';

const app = express();

app.get('/posts', (req, res) => {
    res.json({hello: 'world2'})
})

app.listen(5001, () => {
    console.log('listening on 5001');
});