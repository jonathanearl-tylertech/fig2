import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { PostService } from './post.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { ApiTags } from '@nestjs/swagger';
import { S3StorageService } from 'src/services/storage/S3Storage.service';
import { UserInfo } from 'src/decorators/user-info.decorator';
import { Groups } from 'src/decorators/groups.decorator';
import { Group } from 'src/guards/group.enum';

@ApiTags('post')
@Controller('post')
export class PostController {

  constructor(
    private readonly postService: PostService,
    private readonly s3StorageService: S3StorageService,
  ) {}

  @Groups(Group.User)
  @Get('presignedImgUrl')
  async getImgUrl(@UserInfo() userInfo) {
    const url = await this.s3StorageService.getSignedUrl('posts', `${userInfo._id}/staging`);
    return url;
  }

  @Get('q') 
  searchPosts(@Query() q) {
    const query: any = {};
    if (q.profileId)
      query.profileId = q.profileId;
    return this.postService.query(query);
  }

  @Post()
  create(@Body() createPostDto: CreatePostDto) {
    try {
      return this.postService.create(createPostDto);
    } catch(err) {
      console.error(err);
    }
  }

  @Get()
  findAll() {
    return this.postService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.postService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePostDto: UpdatePostDto) {
    return this.postService.update(id, updatePostDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.postService.remove(+id);
  }
}
