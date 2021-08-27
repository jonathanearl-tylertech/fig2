import { Injectable, NotImplementedException } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { Post } from './entities/post.entity';
import { PostModel } from './db/post.model'; 

@Injectable()
export class PostService {

  constructor() {}

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
    const posts = await PostModel.find({});
    console.log(posts);
    return posts.map(post => post.toObject());
  }

  findOne(id: number) {
    throw new NotImplementedException(`This action returns a #${id} post`);
  }

  update(id: number, updatePostDto: UpdatePostDto) {
    throw new NotImplementedException(`This action updates a #${id} post`);
  }

  remove(id: number) {
    throw new NotImplementedException(`This action removes a #${id} post`);
  }
}
