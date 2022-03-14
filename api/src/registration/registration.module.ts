import { Module } from '@nestjs/common';
import { ProfileModule } from 'src/profile/profile.module';
import { UserService } from 'src/services/user/user.service';
import { RegistrationController } from './registration.controller';
import { RegistrationService } from './registration.service';

@Module({
  imports: [ProfileModule],
  providers: [RegistrationService, UserService],
  controllers: [RegistrationController],
})
export class RegistrationModule {}
