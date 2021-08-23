import { Module } from '@nestjs/common';
import { ProfileModule } from './profile/profile.module';
import { RegistrationModule } from './registration/registration.module';

@Module({
  imports: [ProfileModule, RegistrationModule],
})
export class AppModule {}
