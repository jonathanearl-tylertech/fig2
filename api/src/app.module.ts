import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PostModule } from 'src/services/post/post.module';
import { UserModule } from 'src/services/user/user.module';
import { IdentityModule } from 'src/services/identity/identity.module';
import { ProfileController } from 'src/controllers/profile.controller';
import { RegistrationController } from 'src/controllers/registration.controller';
import { SessionController } from 'src/controllers/session.controller';
import { PasswordService } from 'src/services/password.service';
import { EmojiGeneratorService } from 'src/services/emoji-generator.service';
import { PostController } from 'src/controllers/post.controller';

@Module({
  controllers: [
    PostController,
    ProfileController,
    RegistrationController,
    SessionController,
  ],
  imports: [
    IdentityModule,
    MongooseModule.forRoot('mongodb://localhost/fig'),
    PostModule,
    UserModule,
  ],
  providers: [
    EmojiGeneratorService,
    PasswordService,
  ]
})
export class AppModule { }
