import mongoose from 'mongoose';
const { Schema } = mongoose;
const { ObjectId } = Schema.Types;

const PostSchema = new Schema({
    author: { type: ObjectId, ref: 'authors'},
    caption: String,
    imgUrls: [String],
    createdAt: { type: Date, default: Date.now },
    likes: [{ type: ObjectId, ref: 'authors'}],
    comments: [{ type: ObjectId, ref: 'comments'}],
});
export const Post = mongoose.model('Post', PostSchema);
