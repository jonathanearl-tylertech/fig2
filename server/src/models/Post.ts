import mongoose, { Document, Schema } from 'mongoose';
const { ObjectId } = Schema.Types;

interface Post extends Document {
    author: String,
    caption: String,
    imgUrls: String[],
    createdAt: Date,
    likes: String[],
    comments: String[]
}

const PostSchema = new Schema({
    author: { type: ObjectId, ref: 'users'},
    caption: String,
    imgUrls: [String],
    createdAt: { type: Date, default: Date.now },
    likes: [{ type: ObjectId, ref: 'users'}],
    comments: [{ type: ObjectId, ref: 'comments'}]
});
export const Post = mongoose.model('post', PostSchema);


