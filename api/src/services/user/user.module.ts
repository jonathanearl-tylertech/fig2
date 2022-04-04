import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PasswordService } from 'src/services/password.service';
import { EmojiGeneratorService } from '../emoji-generator.service';
import { User, UserSchema } from './user.schema';
import { UserService } from './user.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }])
  ],
  providers: [
    EmojiGeneratorService,
    PasswordService,
    UserService
  ],
  exports: [UserService],
})
export class UserModule {}
