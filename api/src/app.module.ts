import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SessionModule } from './controllers/session/session.module';
import { PostModule } from './post/post.module';
import { RegistrationModule } from './controllers/registration/registration.module';
import { UserModule } from './services/user/user.module';
import { IdentityModule } from './services/identity/identity.module';
import { RegistrationController } from './controllers/registration/registration.controller';

@Module({
  imports: [
    SessionModule,
    IdentityModule,
    MongooseModule.forRoot('mongodb://localhost/fig'),
    PostModule, 
    RegistrationModule, 
    UserModule, 
  ],
  controllers: [RegistrationController],
})
export class AppModule { }
