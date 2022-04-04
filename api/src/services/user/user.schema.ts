import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';

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
  modifedAt: Date;

  @Prop({ default: 'Everything has beauty, but not everyone sees it.' })
  summary: string;

  @Prop({
    required: true,
    unique: true
  })
  username: string;
}

export const UserSchema = SchemaFactory.createForClass(User);