import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserController } from './controllers/user.controller';
import { UserInfoController } from './controllers/oauth/user-info.controller';
import { User, UserSchema } from './schemas/user.schema';
import { PasswordService } from './services/password.service';
import { AuthorizeController } from './controllers/oauth/authorize.controller';
import { TokenController } from './controllers/oauth/token.controller';
import { UserSessionService } from './services/user-session.service';
import { LoginController } from './controllers/pages/login.controller';
import { AuthnController } from './controllers/authn.controller';
import { UuidService } from './services/uuid.service';
import { CodeSessionService } from './services/code-session.service';
import { LauncherController } from './controllers/pages/launcher.controller';

@Module({
  controllers: [
    AuthorizeController,
    AuthnController,
    LauncherController,
    LoginController,
    TokenController,
    UserController,
    UserInfoController,
  ],
  imports: [
    MongooseModule.forRoot('mongodb://localhost/auth-server'),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  providers: [
    CodeSessionService,
    PasswordService,
    UserSessionService,
    UuidService
  ],
})
export class AppModule { }
