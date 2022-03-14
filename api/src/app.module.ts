import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { PostModule } from './post/post.module';
import { ProfileModule } from './profile/profile.module';
import { RegistrationModule } from './registration/registration.module';

@Module({
  providers: [
  ],
  imports: [
    AuthModule,
    PostModule,
    ProfileModule,
    RegistrationModule,
  ],
})
export class AppModule {}
