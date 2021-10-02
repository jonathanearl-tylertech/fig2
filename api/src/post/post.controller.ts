import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { PostService } from './post.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { ApiTags } from '@nestjs/swagger';
import { S3StorageService } from 'src/services/storage/S3Storage.service';
import { UserInfo } from 'src/decorators/user-info.decorator';
import { Groups } from 'src/decorators/groups.decorator';
import { Group } from 'src/guards/group.enum';
import { CreateCommentDto } from './dto/create-comment.dto';
import { ProfileService } from 'src/profile/profile.service';

@ApiTags('post')
@Controller('post')
export class PostController {

  constructor(
    private readonly postService: PostService,
    private readonly profileService: ProfileService,
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
  createPost(@Body() createPostDto: CreatePostDto) {
    return this.postService.create(createPostDto);
  }

  @Get()
  async findAll() {
    return this.postService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const post = await this.postService.findOne(id);
    const profileIds = post.comments.map(c => c.profileId);
    const profiles = await this.profileService.findAll(profileIds);
    return {
      ...post,
      comments: post.comments.map(c => ({ ...c, username: profiles.filter(p => p._id !== c.profileId)[0].username }))
    }
  }

  @Patch(':id')
  updatePost(@Param('id') id: string, @Body() updatePostDto: UpdatePostDto) {
    return this.postService.update(id, updatePostDto);
  }

  @Delete(':id')
  removePost(@Param('id') id: string) {
    return this.postService.remove(id);
  }

  @Groups(Group.User)
  @Post(':id/comment')
  async createComment(@Param('id') id: string, @Body() createPostDto: CreateCommentDto, @UserInfo() userInfo) {
    const profile = await this.profileService.findOneByUid(userInfo.uid);
    const comment = { ...createPostDto, profileId: profile._id};
    await this.postService.addComment(id, comment)
  }
}
