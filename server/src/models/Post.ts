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
    
});
export const Post = mongoose.model('post', PostSchema);


