import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './schemas/user.schema';
import { UserController } from './controllers/user.controller';
import { EmojiGeneratorService } from './services/emoji-generator.service';
import { Identity, IdentitySchema } from 'src/identity/schemas/identity.schema';

@Module({
  controllers: [UserController],
  imports: [
    MongooseModule.forFeature([{ name: Identity.name, schema: IdentitySchema },]),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  providers: [
    EmojiGeneratorService,
  ],
})
export class UserModule {}
