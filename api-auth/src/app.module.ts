import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserController } from './controllers/user.controller';
import { UserInfoController } from './controllers/user-info.controller';
import { User, UserSchema } from './schemas/user.schema';
import { PasswordService } from './services/password.service';
import { AuthorizeController } from './controllers/oauth/authorize.controller';
import { TokenController } from './controllers/oauth/token.controller';

@Module({
  controllers: [
    AuthorizeController,
    TokenController,
    UserController,
    UserInfoController,
  ],
  imports: [
    MongooseModule.forRoot('mongodb://localhost/auth-server'),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema },]),
  ],
  providers: [PasswordService],
})
export class AppModule { }
