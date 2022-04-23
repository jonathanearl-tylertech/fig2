import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PostModule } from './services/post/post.module';
import { UserModule } from './services/user/user.module';
import { IdentityModule } from './services/identity/identity.module';
import { ProfileController } from './controllers/profile/profile.controller';
import { RegistrationController } from './controllers/registration/registration.controller';
import { SessionController } from './controllers/session/session.controller';
import { PasswordService } from './services/password.service';
import { EmojiGeneratorService } from './services/emoji-generator.service';

@Module({
  controllers: [
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
