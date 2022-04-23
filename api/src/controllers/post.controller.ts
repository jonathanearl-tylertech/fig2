import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  NotImplementedException,
  Body,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { PostService } from 'src/services/post.service';

@ApiTags('post')
@Controller('post')
export class PostController {
  constructor(
    private readonly postSvc: PostService,
  ) {}

  @Get('q')
  searchPosts() {
    throw new NotImplementedException();
  }

  @Post()
  createPost(@Body() body) {
    console.log(body);
    return 'hi';
  }

  @Get()
  async findAll() {
    throw new NotImplementedException();
  }

  @Get(':id')
  async findOne() {
    throw new NotImplementedException();
  }

  @Patch(':id')
  updatePost() {
    throw new NotImplementedException();
  }

  @Delete(':id')
  removePost() {
    throw new NotImplementedException();
  }

  @Post(':id/comment')
  async createComment() {
    throw new NotImplementedException();
  }
}
