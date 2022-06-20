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
import { Uuid } from './services/uuid.service';
import { CodeSessionService } from './services/code-session.service';
import { LauncherController } from './controllers/pages/launcher.controller';
import { WellknownController } from './controllers/wellknown.controller';
import { JwksController } from './controllers/oauth/keys.controller';
import { JWTSignatureService } from './services/jwt-signature.service';
import { SessionController } from './controllers/session.controller';
import { JWTEncryptService } from './services/jwt-encrypt.service';

@Module({
  controllers: [
    AuthorizeController,
    AuthnController,
    JwksController,
    LauncherController,
    LoginController,
    TokenController,
    SessionController,
    UserController,
    UserInfoController,
    WellknownController,
  ],
  imports: [
    MongooseModule.forRoot('mongodb://localhost/auth-server'),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  providers: [
    CodeSessionService,
    JWTEncryptService,
    JWTSignatureService,
    PasswordService,
    UserSessionService,
    Uuid
  ],
})
export class AppModule { }
