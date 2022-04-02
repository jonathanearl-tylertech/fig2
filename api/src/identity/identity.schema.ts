import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { Document } from 'mongoose';
import { User } from 'src/user/user.schema';
import { v4 as uuidv4 } from 'uuid';

export type IdentityDocument = Identity & Document;

export enum IdentityStatus { Staged, Activated, Suspended }
export enum IdentityType { Local }

@Schema({ timestamps: true })
export class Identity {
  @Prop()
  createdAt: Date;

  @Prop({
    required: true,
    unique: true,
  })
  email: string;

  @Prop({
    required: true,
    default: 0
  })
  failedLoginAttempts: number;

  @Prop({
    unique: true,
    type: String,
    default: () => uuidv4(),
  })
  id: string;

  @Prop()
  modifedAt: Date;

  @Prop({ required: true })
  password: string;

  @Prop({
    required: true,
    default: IdentityStatus.Staged
  })
  status: IdentityStatus;

  @Prop({ required: true })
  type: IdentityType;

  @Prop({ 
    required: true,
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  })
  user: User;
}

export const IdentitySchema = SchemaFactory.createForClass(Identity);