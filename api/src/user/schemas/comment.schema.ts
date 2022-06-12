import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { User } from 'src/user/schemas/user.schema';
import { Post } from 'src/user/schemas/post.schema';

export type CommentDocument = Comment & Document;

@Schema()
export class Comment {
  @Prop()
  _id: mongoose.Schema.Types.ObjectId;

  @Prop()
  createdAt: Date;

  @Prop({ required: true })
  message: string;

  @Prop({ required: true })
  post: Post;

  @Prop({ required: true })
  owner: User;

  @Prop()
  modifedAt: Date;
}

export const CommentSchema = SchemaFactory.createForClass(Comment);
