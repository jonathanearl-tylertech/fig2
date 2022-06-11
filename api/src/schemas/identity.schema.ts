import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose, Transform } from 'class-transformer';
import mongoose, { Document } from 'mongoose';

export type IdentityDocument = Identity & Document;

export enum IdentityStatus {
  Staged,
  Activated,
  Suspended,
}

export enum IdentityType {
  Local,
}

export const IDENTITY_STATUS = {
  0: 'STAGED',
  1: 'ACTIVATED',
  2: 'SUSPENDED',
};

export const IDENTITY_TYPE = {
  0: 'Local',
};

@Schema()
export class Identity {
  @Prop({})
  @Exclude()
  _id: mongoose.Schema.Types.ObjectId;

  @Prop({})
  @Exclude()
  __v: number;

  @Prop({})
  @Expose()
  @Transform((value) => value.obj._id.toString())
  @ApiProperty({ type: String })
  id: string;

  @Prop({
    required: true,
    unique: true,
  })
  @Expose()
  @ApiProperty({ type: String })
  email: string;

  @Prop({ required: true })
  @Exclude()
  password: string;

  @Prop({
    required: true,
    default: IdentityStatus.Activated,
  })
  @Expose()
  @Transform((value) => IDENTITY_STATUS[value.obj.status])
  @ApiProperty({ type: String })
  status: IdentityStatus;

  @Prop({
    required: true,
    default: IdentityType.Local,
  })
  @Expose()
  @Transform((value) => IDENTITY_TYPE[value.obj.type])
  @ApiProperty({ type: String })
  type: IdentityType;

  @Prop()
  user: mongoose.Schema.Types.ObjectId;
}

export const IdentitySchema = SchemaFactory.createForClass(Identity);
