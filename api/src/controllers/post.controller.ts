import {
  Controller,
  Post,
  Body,
  UseGuards,
  Get,
  Param,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import {
  ApiNoContentResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags
} from '@nestjs/swagger';
import { Uid } from 'src/decorators/uid.decorator';
import { PostCreate as PostCreate } from 'src/dtos/post-create';
import { PresignUrlDto } from 'src/dtos/presign-url.dto';
import { AuthGuard } from 'src/guards/auth.guard';
import { PostStatus } from 'src/schemas/post.schema';
import { PostService } from 'src/services/post.service';
import { RabbitMqService } from 'src/services/rabbitmq.service';
import { S3Service } from 'src/services/s3.service';

@ApiTags('post')
@Controller('post')
export class PostController {
  constructor(
    private readonly postSvc: PostService,
  ) { }

  // @Get()
  // async findAll() {
  //   throw new NotImplementedException();
  // }

  // @Get(':id')
  // async findOne(@Param('id') id: string) {
  //   const post = await this.postSvc.findOne(id);
  //   const {_id, __v, ...result } = post;
  //   return result;
  // }

  // @Patch(':id')
  // updatePost() {
  //   throw new NotImplementedException();
  // }

  // @Delete(':id')
  // removePost() {
  //   throw new NotImplementedException();
  // }

  // @Post(':id/comment')
  // async createComment() {
  //   throw new NotImplementedException();
  // }
}
