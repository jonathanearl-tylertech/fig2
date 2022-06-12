import { Module } from '@nestjs/common';
import { join } from 'path';
import { MongooseModule } from '@nestjs/mongoose';
import { EmojiGeneratorService } from 'src/services/emoji-generator.service';
import { PasswordService } from 'src/services/password.service';
import { UserService } from 'src/services/user.service';
import { PostService } from 'src/services/post.service';
import { Post, PostSchema } from './user/schemas/post.schema';
import { Comment, CommentSchema } from './user/schemas/comment.schema';
import { User, UserSchema } from './user/schemas/user.schema';
import { S3Service } from './services/s3.service';
import { ConfigModule } from '@nestjs/config';
import { RabbitMqService } from './services/rabbitmq.service';
import { ServeStaticModule } from '@nestjs/serve-static';
import { UserController } from './user/controllers/user.controller';
import { IdentityModule } from './identity/identity.module';
import { UserModule } from './user/user.module';

@Module({
  controllers: [UserController],
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot('mongodb://localhost/fig'),
    MongooseModule.forFeature([{ name: Post.name, schema: PostSchema }]),
    MongooseModule.forFeature([{ name: Comment.name, schema: CommentSchema }]),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    ServeStaticModule.forRoot({
      rootPath: join('/home/jon/wte/fig/media'),
      serveRoot: '/media',
    }),
    IdentityModule,
    UserModule,
  ],
  providers: [
    EmojiGeneratorService,
    PasswordService,
    PostService,
    RabbitMqService,
    S3Service,
    UserService,
  ],
})
export class AppModule {}
