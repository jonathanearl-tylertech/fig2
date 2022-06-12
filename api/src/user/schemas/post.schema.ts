import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { Comment } from 'src/user/schemas/comment.schema';

export type PostDocument = Post & Document;

export enum PostStatus {
  pending,
  staged,
  published,
  hidden,
}

@Schema()
export class Post {
  @Prop()
  _id: mongoose.Schema.Types.ObjectId;

  @Prop()
  author: mongoose.Schema.Types.ObjectId;

  @Prop()
  comments: [Comment];

  @Prop()
  createdAt: Date;

  @Prop()
  description: string;

  @Prop()
  imgUrl: string;

  @Prop()
  modifedAt: Date;

  @Prop()
  status: PostStatus;
}

export const PostSchema = SchemaFactory.createForClass(Post);
