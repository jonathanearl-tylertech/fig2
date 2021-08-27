import { Module } from '@nestjs/common';
import { ProfileModule } from 'src/profile/profile.module';
import { OktaService } from 'src/services/okta.service';
import { RegistrationController } from './registration.controller';

@Module({
  imports: [ProfileModule],
  providers: [OktaService],
  controllers: [RegistrationController]
})
export class RegistrationModule {}
