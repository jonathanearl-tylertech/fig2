import {
  Controller,
  Post,
  Body,
  UseGuards,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { FileInterceptor } from '@nestjs/platform-express';
import { MulterOptions } from '@nestjs/platform-express/multer/interfaces/multer-options.interface';
import {
  ApiBody,
  ApiConsumes,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOperation,
  ApiTags
} from '@nestjs/swagger';
import { Express } from 'express'
import { mkdir } from 'fs';
import mongoose from 'mongoose';
import multer from 'multer';
import { Uid } from 'src/decorators/uid.decorator';
import { PostCreate } from 'src/dtos/post-create';
import { AuthGuard } from 'src/guards/auth.guard';
import { PostService } from 'src/services/post.service';

const storage = multer.diskStorage({
  // destination: ,
  destination: (req, file, cb) => {
    const destination = `/home/jon/wte/fig/media/posts/${req.signedCookies.uid}`;
    mkdir(destination, (_) => cb(null, destination));
  },
  filename: function (req, file, cb) {
    const postId = new mongoose.mongo.ObjectId();
    cb(null, postId.toString());
  }
});

@ApiTags('new-post')
@Controller('new-post')
export class NewPostController {
  constructor(
    private readonly configSvc: ConfigService,
    private readonly postSvc: PostService,
  ) { }

  @Post()
  @UseGuards(AuthGuard)
  @UseInterceptors(FileInterceptor('image', {
    limits: {
      fileSize: 2000000,
      fields: 10,
      files: 1,
      parts: 50,
    },
    storage: storage,
  } as MulterOptions))
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
        description: {
          type: 'string'
        },
      },
    },
  })
  @ApiOperation({ summary: 'create post with staged image' })
  @ApiCreatedResponse({type: String, description: 'location of post'})
  @ApiNotFoundResponse({ type: String })
  async CreatePost(
    @Uid() uid: string,
    @UploadedFile() image: Express.Multer.File,
    @Body() createPost: PostCreate
  ) {
    const { description } = createPost;
    const post = await this.postSvc.create(image.filename, uid, description)
    const baseUrl = this.configSvc.get("BASE_URL");
    const postUrl = `${baseUrl}/posts/${post._id}`;
    return postUrl;
  }
}
