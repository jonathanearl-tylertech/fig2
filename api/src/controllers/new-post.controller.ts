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

@ApiTags('new-post')
@Controller('new-post')
export class NewPostController {
  private readonly stagedBucket = 'staged';
  private readonly publishedBucket = 'published';
  private stagedKey = (uid: string, pid: string) => (`${uid}/${pid}`);
  private publishedKey = (uid: string, pid: string) => (`post/${pid}`);
  private messageQueue = 'publish-image';
  private message = (uid: string, postId: string) => JSON.stringify({
    bucket: this.stagedBucket,
    key: this.stagedKey(uid, postId),
    targetBucket: this.publishedBucket,
    targetKey: this.publishedKey(uid, postId),
  })

  constructor(
    private readonly postSvc: PostService,
    private readonly s3Svc: S3Service,
    private readonly rabbitSvc: RabbitMqService
  ) { }

  @Get('presigned-url')
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'get post url to upload' })
  @ApiOkResponse({ type: PresignUrlDto, description: 'a presigned url to stage post media to' })
  async getPresignedUrl(
    @Uid() uid: string,
  ) {
    const post = await this.postSvc.create(uid);
    const stagedKey = this.stagedKey(uid, post._id);
    const imageUploadUrl = await this.s3Svc.getSignedUrl(this.stagedBucket, stagedKey);
    return {
      imageUploadUrl,
      postId: post._id
    };
  }

  @Post(':id')
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'create post' })
  @ApiNoContentResponse()
  async submitPost(
    @Param('id') id: string,
    @Body() body: PostCreate,
    @Uid() uid: string,
  ) {
    const { description } = body;
    const post = await this.postSvc.findOne(id);
    if (!post)
      return new NotFoundException();

    if (post.status != PostStatus.pending)
      return new BadRequestException(`post: '${id}' already submitted, status: '${post.status}'`);

    await this.postSvc.update(post._id, { status: PostStatus.staged, description });
    this.rabbitSvc.send(this.messageQueue, this.message(uid, post._id));
  }
}
