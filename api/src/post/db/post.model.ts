import mongoose from 'mongoose';
import { Post } from '../entities/post.entity';
import { CommentSchema } from './comment.model';

const PostSchema = new mongoose.Schema({
  description: String,
  comments: { type: [CommentSchema], default: [] },
  profileId: mongoose.Schema.Types.ObjectId,
  imgUrl: String,
  createdAt: { type: Date, default: Date.now() },
  modifiedAt: { type: Date, default: Date.now() },
});

export const PostModel = mongoose.model<Post>('Post', PostSchema);