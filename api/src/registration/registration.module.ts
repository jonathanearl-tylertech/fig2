import { Module } from '@nestjs/common';
import { ProfileModule } from 'src/profile/profile.module';
import { AuthService } from 'src/services/auth/auth.service';
import { RegistrationController } from './registration.controller';

@Module({
  imports: [ProfileModule],
  providers: [AuthService],
  controllers: [RegistrationController]
})
export class RegistrationModule {}
