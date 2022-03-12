import { Module } from '@nestjs/common';
import { ProfileModule } from './profile/profile.module';
import { RegistrationModule } from './registration/registration.module';
import { PostModule } from './post/post.module';

@Module({
  providers: [
  ],
  imports: [
    ProfileModule,
    RegistrationModule,
    PostModule,
  ],
})
export class AppModule {}
