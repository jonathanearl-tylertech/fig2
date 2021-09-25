import mongoose from 'mongoose';
import { Comment } from '../entities/comment.entity';

export const CommentSchema = new mongoose.Schema({
    profileId: mongoose.Schema.Types.ObjectId,
    message: String,
    createdAt: { type: Date, default: Date.now() },
});
export const CommentModel = mongoose.model<Comment>('Comment', CommentSchema);