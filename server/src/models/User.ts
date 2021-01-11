import mongoose, { Schema, Document } from 'mongoose';

export interface IUser extends Document{
    name: string,
    email: string,
    message: string,
    createdAt: Date
}

const UserSchema = new Schema<IUser>({
    name: String,
    email: String,
    message: String,
    createdAt: { type: Date, default: Date.now },
});
export const User = mongoose.model<IUser>('user', UserSchema);
