import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';
import { Identity, IdentitySchema } from 'src/identity/identity.schema';

export type UserDocument = User & Document;

@Schema({ timestamps: true })
export class User {
  @Prop({
    unique: true,
    default: () => uuidv4(),
  })
  id: string;

  @Prop({
    required: true,
    type: mongoose.Schema.Types.ObjectId
  })
  identity: Identity;

  @Prop({ unique: true })
  username: string;

  @Prop({ default: false })
  disabled: boolean;

  @Prop({ default: '🐢' })
  icon: string;

  @Prop({ default: 'Everything has beauty, but not everyone sees it.' })
  summary: string;

  @Prop()
  createdAt: Date;

  @Prop()
  modifedAt: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);