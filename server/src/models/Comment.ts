import mongoose from 'mongoose';
const { Schema } = mongoose;
const { ObjectId } = Schema.Types;

const CommentSchema = new Schema({
    author: { type: ObjectId, ref: 'author'},
    caption: String,
    imgUrls: [String],
    createdAt: { type: Date, default: Date.now },
    likes: [{ type: ObjectId, ref: 'author'}],
    comments: [{ type: ObjectId, ref: 'comment'}],
});
export const Comment = mongoose.model('comment', CommentSchema);
