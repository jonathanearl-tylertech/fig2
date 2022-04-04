import { Module } from '@nestjs/common';
import { IdentityModule } from 'src/services/identity/identity.module';
import { PasswordService } from 'src/services/password.service';
import { UserModule } from 'src/services/user/user.module';
import { RegistrationController } from './registration.controller';

@Module({
  imports: [
    IdentityModule,
    UserModule,
  ],
  providers: [
    PasswordService,
  ],
  controllers: [RegistrationController]
})
export class RegistrationModule {}
