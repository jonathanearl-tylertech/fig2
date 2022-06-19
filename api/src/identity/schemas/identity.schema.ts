import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { User } from 'src/user/schemas/user.schema';
import { v4 as uuidv4 } from 'uuid';

export type IdentityDocument = Identity & Document;

@Schema()
export class Identity extends Document {
  @Prop({ type: String, required: true, index: true, unique: true })
  email: string;

  @Prop({ type: String, required: true, default: () => uuidv4() })
  _id: string;

  @Prop({ type: String, required: true })
  password: string;

  @Prop({type: String, ref: 'User'})
  user: User
}

export const IdentitySchema = SchemaFactory.createForClass(Identity);
