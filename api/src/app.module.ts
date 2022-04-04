import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { PostModule } from './post/post.module';
import { RegistrationModule } from './controllers/registration/registration.module';
import { UserModule } from './services/user/user.module';
import { IdentityModule } from './services/identity/identity.module';
import { RegistrationController } from './controllers/registration/registration.controller';

@Module({
  imports: [
    AuthModule,
    IdentityModule,
    MongooseModule.forRoot('mongodb://localhost/fig'),
    PostModule, 
    RegistrationModule, 
    UserModule, 
  ],
  controllers: [RegistrationController],
})
export class AppModule { }
