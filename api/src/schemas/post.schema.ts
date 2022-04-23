import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { User } from 'src/schemas/user.schema';
import { Comment } from 'src/schemas/comment.schema';

export type PostDocument = Post & Document;

@Schema()
export class Post {
  @Prop()
  _id: mongoose.Schema.Types.ObjectId;

  @Prop()
  comments: [Comment]

  @Prop()
  createdAt: Date;

  @Prop()
  description: String;

  @Prop()
  imgUrl: String;

  @Prop()
  message: String;

  @Prop()
  modifedAt: Date;

  @Prop()
  owner: User;
}

export const PostSchema = SchemaFactory.createForClass(Post);