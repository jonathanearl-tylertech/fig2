import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose, Transform } from 'class-transformer';
import { Document } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

export type IdentityDocument = Identity & Document;
export enum IdentityStatus {
  Staged,
  Activated,
  Suspended,
}
export const IDENTITY_STATUS = {
  0: 'STAGED',
  1: 'ACTIVATED',
  2: 'SUSPENDED',
};

@Schema()
export class Identity {
  @Prop({ required: true })
  @Exclude()
  _password: string;

  @Prop({ required: true, unique: true })
  @Expose()
  @ApiProperty({ type: String })
  email: string;

  @Prop({ required: true, default: () => uuidv4(), index: true })
  @Expose()
  @Transform((value) => value.obj._id.toString())
  @ApiProperty({ type: String })
  id: string;

  @Prop({ required: true, default: IdentityStatus.Activated })
  @Exclude()
  status: IdentityStatus;
}

export const IdentitySchema = SchemaFactory.createForClass(Identity);
