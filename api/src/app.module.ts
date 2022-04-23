import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { EmojiGeneratorService } from 'src/services/emoji-generator.service';
import { PasswordService } from 'src/services/password.service';
import { UserService } from 'src/services/user.service';
import { PostController } from 'src/controllers/post.controller';
import { ProfileController } from 'src/controllers/profile.controller';
import { RegistrationController } from 'src/controllers/registration.controller';
import { SessionController } from 'src/controllers/session.controller';
import { IdentityService } from 'src/services/identity.service';
import { PostService } from 'src/services/post.service';
import { Identity, IdentitySchema } from './schemas/identity.schema';
import { Post, PostSchema } from './schemas/post.schema';
import { Comment, CommentSchema } from './schemas/comment.schema';
import { User, UserSchema } from './schemas/user.schema';

@Module({
  controllers: [
    PostController,
    ProfileController,
    RegistrationController,
    SessionController,
  ],
  imports: [
    MongooseModule.forRoot('mongodb://localhost/fig'),
    MongooseModule.forFeature([{ name: Identity.name, schema: IdentitySchema }]),
    MongooseModule.forFeature([{ name: Post.name, schema: PostSchema }]),
    MongooseModule.forFeature([{ name: Comment.name, schema: CommentSchema }]),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  providers: [
    EmojiGeneratorService,
    IdentityService,
    PasswordService,
    PostService,
    UserService,
  ],
})
export class AppModule { }
