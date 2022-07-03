import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

export type UserDocument = User & Document;

@Schema({ timestamps: true })
export class User extends Document {
  @Prop()
  createdAt: Date;

  @Prop({ type: String, required: true, default: () => uuidv4() })
  _id: string;

  @Prop({ type: String, maxlength: 7 })
  icon: string;

  @Prop({ type: String, required: true })
  email: string;

  @Prop({ type: String, required: true, indexed: true })
  sub: string;

  @Prop({ type: Date })
  modifedAt: Date;

  @Prop({ type: String, maxlength: 256 })
  summary: string;

  @Prop({
    type: String,
    required: true,
    indexed: true,
    minLength: 1,
    maxLength: 25,
  })
  username: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
