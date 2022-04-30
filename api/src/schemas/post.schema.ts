import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { Comment } from 'src/schemas/comment.schema';

export type PostDocument = Post & Document;

export enum PostStatus { pending, staged, published, hidden }

@Schema()
export class Post {
  @Prop()
  _id: mongoose.Schema.Types.ObjectId;

  @Prop()
  author: mongoose.Schema.Types.ObjectId;

  @Prop()
  comments: [Comment]

  @Prop()
  createdAt: Date;

  @Prop()
  description: String;

  @Prop()
  imgUrl: String;

  @Prop()
  modifedAt: Date;

  @Prop()
  status: PostStatus
}

export const PostSchema = SchemaFactory.createForClass(Post);