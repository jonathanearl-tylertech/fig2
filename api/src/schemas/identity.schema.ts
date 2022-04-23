import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';

export type IdentityDocument = Identity & Document;

export enum IdentityStatus { Staged, Activated, Suspended }
export enum IdentityType { Local }

@Schema()
export class Identity {
  @Prop()
  _id: mongoose.Schema.Types.ObjectId;

  @Prop({
    required: true,
    unique: true,
  })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({
    required: true,
    default: IdentityStatus.Activated
  })
  status: IdentityStatus;

  @Prop({
    required: true,
    default: IdentityType.Local
  })
  type: IdentityType;

  @Prop()
  user: mongoose.Schema.Types.ObjectId;
}

export const IdentitySchema = SchemaFactory.createForClass(Identity);