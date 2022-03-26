import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { IdentityService } from './identity.service';
import { Identity, IdentitySchema } from './identity.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: Identity.name, schema: IdentitySchema }])],
  providers: [IdentityService],
  exports: [IdentityService],
})
export class IdentityModule {}
