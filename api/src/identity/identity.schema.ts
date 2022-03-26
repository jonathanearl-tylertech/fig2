import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

export type IdentityDocument = Identity & Document;

export enum IdentityStatus { Staged, Activated, Suspended }

@Schema({ timestamps: true })
export class Identity {
  @Prop({
    unique: true,
    type: String,
    default: () => uuidv4(),
  })
  id: string

  @Prop({ 
    required: true,
    unique: true,
  })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ 
    required: true,
    default: 0
  })
  failedLoginAttempts: number;

  @Prop({
    required: true,
    default: IdentityStatus.Staged
  })
  status: IdentityStatus;

  @Prop()
  createdAt: Date;
  
  @Prop()
  modifedAt: Date;
}

export const IdentitySchema = SchemaFactory.createForClass(Identity);