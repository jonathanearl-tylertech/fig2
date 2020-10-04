import mongoose from 'mongoose';
const { Schema } = mongoose;
const { ObjectId } = Schema.Types;

const Post = new Schema({
    author: ObjectId,
    caption: String,
    imgUrls: [String],
    date: { type: Date, default: Date.now },
    likes: [{ type: ObjectId, ref: 'authors'}],
    comments: [{ type: ObjectId, ref: 'comments'}],
});

// {
//     author: ObjectId,

//     msg: String,

//     date: { 
//         type: Date,
//         default: Date.now
//     },

//     likes: Number,
// }