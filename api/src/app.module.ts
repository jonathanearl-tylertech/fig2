import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { UserController } from './controllers/user.controller';
import { User, UserSchema } from './schemas/user.schema';
import { EmojiGeneratorService } from './services/emoji-generator.service';

@Module({
  controllers: [UserController],
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    MongooseModule.forRoot('mongodb://localhost/fig'),
  ],
  providers: [EmojiGeneratorService]
})
export class AppModule {}
