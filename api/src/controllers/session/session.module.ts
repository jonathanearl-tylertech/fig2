import { Module } from '@nestjs/common';
import { PasswordService } from 'src/services/password.service';
import { IdentityModule } from 'src/services/identity/identity.module';
import { UserModule } from 'src/services/user/user.module';
import { SessionController } from './session.controller';

@Module({
  providers: [PasswordService],
  imports: [
    IdentityModule,
    UserModule
  ],
  controllers: [SessionController],
})
export class SessionModule {}
