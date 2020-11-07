import mongoose, { Schema, Document } from 'mongoose';

export interface IAuthor extends Document{
    name: string,
    email: string,
    message: string,
    createdAt: Date
}

const AuthorSchema = new Schema<IAuthor>({
    name: String,
    email: String,
    message: String,
    createdAt: { type: Date, default: Date.now },
});
export const Author = mongoose.model<IAuthor>('author', AuthorSchema);
