import { Module } from '@nestjs/common';
import { join } from 'path';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { ServeStaticModule } from '@nestjs/serve-static';
import { UserController } from './user/controllers/user.controller';
import { IdentityModule } from './identity/identity.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    IdentityModule,
    MongooseModule.forRoot('mongodb://localhost/fig'),
    ServeStaticModule.forRoot({
      rootPath: join('/home/jon/wte/fig/media'),
      serveRoot: '/media',
    }),
    UserModule,
  ],
})
export class AppModule {}
