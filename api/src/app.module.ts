import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { PostModule } from './post/post.module';
import { RegistrationModule } from './registration/registration.module';
import { UserModule } from './user/user.module';
import { IdentityModule } from './identity/identity.module';

@Module({
  providers: [],
  imports: [
    AuthModule,
    IdentityModule,
    MongooseModule.forRoot('mongodb://localhost/fig'),
    PostModule, 
    RegistrationModule, 
    UserModule, 
  ],
})
export class AppModule { }
