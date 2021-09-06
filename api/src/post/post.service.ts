import { Injectable, NotImplementedException } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { Post } from './entities/post.entity';
import { PostModel } from './db/post.model'; 

@Injectable()
export class PostService {
  async create(createPostDto: CreatePostDto): Promise<Post> {
    const post: Partial<Post> = {
      ...createPostDto,
      createdAt: new Date(),
    } 
    const result = new PostModel(post);
    await result.save();
    return result.toObject();
  }

  async findAll(): Promise<Post[]> {
    const posts = await PostModel.find({}).lean();
    return posts;
  }

  async findOne(id: string) {
    const post = await PostModel.findById(id).lean();
    return post;
  }

  async update(id: string, updatePostDto: UpdatePostDto) {
    throw new NotImplementedException(`This action updates a #${id} post`);
  }

  async remove(id: number) {
    throw new NotImplementedException(`This action removes a #${id} post`);
  }

  async query(query: any) {
    const posts = await PostModel.find(query).lean();
    return posts;
  }
}
