import { Injectable } from '@nestjs/common';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { Post } from '../entities/post.entity';

dotenv.config()

const postSchema = new mongoose.Schema({
  description: String,
  username: String,
  imgUrl: String,
  createdAt: Date,
  modifiedAt: Date,
});

export const PostModel = mongoose.model<Post>('Post', postSchema);