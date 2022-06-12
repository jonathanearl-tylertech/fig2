import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  NotImplementedException,
} from '@nestjs/common';
import mongoose, { Model } from 'mongoose';
import { Post, PostDocument } from 'src/user/schemas/post.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Comment, CommentDocument } from 'src/user/schemas/comment.schema';
import { User, UserDocument } from 'src/user/schemas/user.schema';

@Injectable()
export class PostService {
  constructor(
    @InjectModel(Comment.name) private comment: Model<CommentDocument>,
    @InjectModel(Post.name) private post: Model<PostDocument>,
    @InjectModel(User.name) private user: Model<UserDocument>,
  ) {}

  create = async (fileName: string, authorId: string, description: string) => {
    const author = await this.user.findById(authorId);
    if (!author)
      throw new NotFoundException(`user not found userId:${authorId}`);

    const postId = new mongoose.mongo.ObjectId(fileName);
    const post = await this.post.create({
      _id: postId,
      author: author._id,
      description,
    });
    author.posts.push(post._id);
    await author.save();
    return post.toObject();
  };

  findAll = async () => {
    return await this.post.find({}).lean();
  };

  findOne = async (id: string) => {
    return await this.post.findById(id).lean();
  };

  update = async (id: string, doc: Partial<Post>) => {
    const result = await this.post.findOneAndUpdate({ id }, doc).lean();
    return result._id.toString();
  };

  remove = async (id: string) => {
    throw new NotImplementedException(`This action removes a #${id} post`);
  };

  query = async (query: any) => {
    return await this.post
      .find(query)
      .lean()
      .sort((a, b) => b.createdAt.valueOf() - a.createdAt.valueOf());
  };

  createComment = async (postId: string, ownerId: string, message: string) => {
    const post = await this.post.findById(postId);
    if (!post)
      throw new InternalServerErrorException(`post not found postId:${postId}`);

    const owner = await this.user.findById(ownerId);
    if (!owner)
      throw new InternalServerErrorException(
        `owner not found ownerId:${ownerId}`,
      );

    const comment = await this.comment.create({
      _id: new mongoose.mongo.ObjectId(),
      post,
      owner,
      message,
    });
    post.comments.push(comment);
    await post.save();
    return post.toObject();
  };
}
