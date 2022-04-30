import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { Post } from './post.schema';

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop()
  _id: mongoose.Schema.Types.ObjectId;

  @Prop()
  createdAt: Date;

  @Prop({ default: false })
  disabled: boolean;

  @Prop({ default: '🐢' })
  icon: string;

  @Prop()
  identity: mongoose.Schema.Types.ObjectId;

  @Prop()
  modifedAt: Date;

  @Prop()
  posts: mongoose.Schema.Types.ObjectId[];

  @Prop({ default: 'Everything has beauty, but not everyone sees it.' })
  summary: string;

  @Prop({
    required: true,
    unique: true
  })
  username: string;
}

export const UserSchema = SchemaFactory.createForClass(User);