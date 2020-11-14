import mongoose, { Document, Schema, Types } from 'mongoose';

interface Post extends Document {
    author: Types.ObjectId,
    caption: string,
    imgUrls: string[],
    createdAt: Date,
    likes: Types.ObjectId[],
    comments: Types.ObjectId[]
}

const PostSchema = new Schema({
    author: { type: Types.ObjectId, ref: 'author' },
    caption: String,
    imgUrls: [String],
    createdAt: { type: Date, default: Date.now },
    likes: [{ type: Types.ObjectId, ref: 'author' }],
    comments: [{ type: Types.ObjectId, ref: 'comment' }],
});
export const Post = mongoose.model<Post>('post', PostSchema);


