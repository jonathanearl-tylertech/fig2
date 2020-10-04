import mongoose from 'mongoose';
const { Schema } = mongoose;
const { ObjectId } = Schema.Types;

const AuthorSchema = new Schema({
    name: String,
    email: String,
    message: String,
    createdAt: { type: Date, default: Date.now },
});
export const Author = mongoose.model('Author', AuthorSchema);
