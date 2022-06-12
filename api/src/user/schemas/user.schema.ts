import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop()
  _id: Types.ObjectId;

  @Prop({ default: () => Date.now() })
  createdAt: Date;

  @Prop({ default: false })
  disabled: boolean;

  @Prop({ default: '🐢' })
  icon: string;

  @Prop()
  identity: Types.ObjectId;

  @Prop()
  modifedAt: Date;

  @Prop()
  posts: Types.ObjectId[];

  @Prop({ default: 'Everything has beauty, but not everyone sees it.' })
  summary: string;

  @Prop({
    required: true,
    unique: true,
  })
  username: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
