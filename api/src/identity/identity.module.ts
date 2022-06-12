import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { IdentityController } from './controllers/identity.controller';
import { PasswordService } from 'src/services/password.service';
import { Identity, IdentitySchema } from './schemas/identity.schema';

@Module({
  controllers: [IdentityController],
  imports: [
    MongooseModule.forFeature([
      { name: Identity.name, schema: IdentitySchema },
    ]),
  ],
  providers: [PasswordService],
})
export class IdentityModule {}
