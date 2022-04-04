import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  NotImplementedException,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('post')
@Controller('post')
export class PostController {
  @Get('presignedImgUrl')
  async getImgUrl() {
    throw new NotImplementedException();
  }

  @Get('q')
  searchPosts() {
    throw new NotImplementedException();
  }

  @Post()
  createPost() {
    throw new NotImplementedException();
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
