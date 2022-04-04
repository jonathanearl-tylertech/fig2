import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SessionModule } from './controllers/session/session.module';
import { PostModule } from './services/post/post.module';
import { RegistrationModule } from './controllers/registration/registration.module';
import { UserModule } from './services/user/user.module';
import { IdentityModule } from './services/identity/identity.module';
import { ProfileModule } from './controllers/profile/profile.module';

@Module({
  imports: [
    IdentityModule,
    MongooseModule.forRoot('mongodb://localhost/fig'),
    PostModule,
    RegistrationModule,
    SessionModule,
    UserModule,
    ProfileModule,
  ]
})
export class AppModule { }
