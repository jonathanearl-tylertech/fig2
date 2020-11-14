import mongoose from 'mongoose';
const { Schema } = mongoose;
const { ObjectId } = Schema.Types;

const PostSchema = new Schema({
    author: { type: ObjectId, ref: 'author'},
    caption: String,
    imgUrls: [String],
    createdAt: { type: Date, default: Date.now },
    likes: [{ type: ObjectId, ref: 'author'}],
    comments: [{ type: ObjectId, ref: 'comment'}],
});
export const Post = mongoose.model('comment', PostSchema);
