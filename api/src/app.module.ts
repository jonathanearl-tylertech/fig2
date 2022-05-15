import { Module } from '@nestjs/common';
import { join } from 'path';
import { MongooseModule } from '@nestjs/mongoose';
import { EmojiGeneratorService } from 'src/services/emoji-generator.service';
import { PasswordService } from 'src/services/password.service';
import { UserService } from 'src/services/user.service';
import { ProfileController } from 'src/controllers/profile.controller';
import { RegistrationController } from 'src/controllers/registration.controller';
import { SessionController } from 'src/controllers/session.controller';
import { IdentityService } from 'src/services/identity.service';
import { PostService } from 'src/services/post.service';
import { Identity, IdentitySchema } from './schemas/identity.schema';
import { Post, PostSchema } from './schemas/post.schema';
import { Comment, CommentSchema } from './schemas/comment.schema';
import { User, UserSchema } from './schemas/user.schema';
import { S3Service } from './services/s3.service';
import { ConfigModule } from '@nestjs/config';
import { RabbitMqService } from './services/rabbitmq.service';
import { NewPostController } from './controllers/new-post.controller';
import { ServeStaticModule } from '@nestjs/serve-static';

@Module({
  controllers: [
    NewPostController,
    ProfileController,
    RegistrationController,
    SessionController,
  ],
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot('mongodb://localhost/fig'),
    MongooseModule.forFeature([{ name: Identity.name, schema: IdentitySchema }]),
    MongooseModule.forFeature([{ name: Post.name, schema: PostSchema }]),
    MongooseModule.forFeature([{ name: Comment.name, schema: CommentSchema }]),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    ServeStaticModule.forRoot({
      rootPath: join('/home/jon/wte/fig/media'),
      serveRoot: '/media',
    }),
  ],
  providers: [
    EmojiGeneratorService,
    IdentityService,
    PasswordService,
    PostService,
    RabbitMqService,
    S3Service,
    UserService,
  ],
})
export class AppModule { }
