import {
  Controller,
  Post,
  Body,
  UseGuards,
  UnauthorizedException,
} from '@nestjs/common';
import {
  ApiOkResponse,
  ApiOperation,
  ApiTags
} from '@nestjs/swagger';
import { Uid } from 'src/decorators/uid.decorator';
import { PresignUrlCreateDto } from 'src/dtos/presign-url-create';
import { PresignUrlDto } from 'src/dtos/presign-url.dto';
import { AuthGuard } from 'src/guards/auth.guard';
import { PostService } from 'src/services/post.service';
import { S3Service } from 'src/services/s3.service';

@ApiTags('post')
@Controller('post')
export class PostController {
  constructor(
    private readonly postSvc: PostService,
    private readonly s3Svc: S3Service,
  ) { }

  // @Get('q')
  // searchPosts() {
  //   throw new NotImplementedException();
  // }

  @Post('presignUrl')
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'create post' })
  @ApiOkResponse({ type: PresignUrlDto, description: 'a presigned url to post media to' })
  async createPresignUrl(
    @Body() body: PresignUrlCreateDto,
    @Uid() uid: string,
  ) {
    if (!uid)
      throw new UnauthorizedException();

    console.log(uid);

    const post = await this.postSvc.create(body.postDescription, uid);
    const imageUploadUrl = await this.s3Svc.getSignedUrl('staging', `${uid}/${post._id}`);
    return { imageUploadUrl };
  }

  // @Get()
  // async findAll() {
  //   throw new NotImplementedException();
  // }

  // @Get(':id')
  // async findOne() {
  //   throw new NotImplementedException();
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
