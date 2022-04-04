import { Module } from '@nestjs/common';
import { IdentityModule } from 'src/services/identity/identity.module';
import { PasswordService } from 'src/services/password.service';
import { UserModule } from 'src/services/user/user.module';
import { RegistrationController } from './registration.controller';
import { RegistrationService } from './registration.service';

@Module({
  imports: [
    IdentityModule,
    UserModule,
  ],
  providers: [
    PasswordService,
    RegistrationService
  ],
  controllers: [RegistrationController],
  exports: [RegistrationService]
})
export class RegistrationModule {}
