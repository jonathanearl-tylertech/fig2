import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { IdentityService } from './identity.service';
import { Identity, IdentitySchema } from './identity.schema';
import { PasswordService } from 'src/services/password.service';

@Module({
  imports: [MongooseModule.forFeature([{ name: Identity.name, schema: IdentitySchema }])],
  providers: [
    IdentityService,
    PasswordService,
  ],
  exports: [IdentityService],
})
export class IdentityModule {}
