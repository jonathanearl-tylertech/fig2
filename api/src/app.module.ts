import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { PostModule } from './post/post.module';
import { RegistrationModule } from './registration/registration.module';
import { UserModule } from './user/user.module';

@Module({
  providers: [],
  imports: [AuthModule, PostModule, RegistrationModule, UserModule],
})
export class AppModule {}
