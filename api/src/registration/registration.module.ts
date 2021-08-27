import { Module } from '@nestjs/common';
import { OktaService } from 'src/services/okta.service';
import { RegistrationController } from './registration.controller';

@Module({
  providers: [OktaService],
  controllers: [RegistrationController]
})
export class RegistrationModule {}
