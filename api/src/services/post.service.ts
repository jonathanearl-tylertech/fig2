import { Injectable, InternalServerErrorException, NotImplementedException } from '@nestjs/common';
import mongoose, { Model } from 'mongoose';
import { Post, PostDocument, PostStatus } from 'src/schemas/post.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Comment, CommentDocument } from 'src/schemas/comment.schema';
import { User, UserDocument } from 'src/schemas/user.schema';

@Injectable()
export class PostService {
  constructor(
    @InjectModel(Comment.name) private comment: Model<CommentDocument>,
    @InjectModel(Post.name) private post: Model<PostDocument>,
    @InjectModel(User.name) private user: Model<UserDocument>,
  ) { }

  create = async (description: string, authorId: string) => {
    const author = await this.user.findById(authorId);
    if (!author)
      throw new InternalServerErrorException(`owner not found ownerId:${authorId}`);

    const post = await this.post.create({
      _id: new mongoose.mongo.ObjectId(),
      author: authorId,
      description,
      status: PostStatus.pending,
    });
    author.posts.push(post._id);
    await author.save();
    return post.toObject();
  }

  findAll = async () => {
    return await this.post.find({}).lean();
  }

  findOne = async (id: string) => {
    return await this.post.findById(id).lean();
  }

  remove = async (id: string) => {
    throw new NotImplementedException(`This action removes a #${id} post`);
  }

  query = async (query: any) => {
    return await this.post.find(query)
      .lean()
      .sort((a, b) => b.createdAt.valueOf() - a.createdAt.valueOf());
  }

  createComment = async (postId: string, ownerId: string, message: string) => {
    const post = await this.post.findById(postId);
    if (!post)
      throw new InternalServerErrorException(`post not found postId:${postId}`);

    const owner = await this.user.findById(ownerId);
    if (!owner)
      throw new InternalServerErrorException(`owner not found ownerId:${ownerId}`);

    const comment = await this.comment.create({
      _id: new mongoose.mongo.ObjectId(),
      post,
      owner,
      message,
    });
    post.comments.push(comment);
    await post.save();
    return post.toObject();
  }
}
