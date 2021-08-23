import { Module } from '@nestjs/common';
import { OktaModule } from 'src/okta/okta.module';
import { ProfileModule } from 'src/profile/profile.module';
import { RegistrationController } from './registration.controller';

@Module({
  imports: [ProfileModule, OktaModule],
  controllers: [RegistrationController]
})
export class RegistrationModule {}
