import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { IdentityController } from './controllers/identity.controller';
import { Identity, IdentitySchema } from './schemas/identity.schema';
import { PasswordService } from './services/password.service';

@Module({
  controllers: [
    IdentityController,
  ],
  imports: [
    MongooseModule.forFeature([{ name: Identity.name, schema: IdentitySchema },]),
  ],
  providers: [PasswordService],
})
export class IdentityModule { }
