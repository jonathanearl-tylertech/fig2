import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import dotenv from 'dotenv';
import { MongooseClient } from 'src/mongoose/mongoose-client';
import cookieParser from 'cookie-parser';

dotenv.config();

async function bootstrap() {
  const options = {
    connectionString:
      process.env.MONGO_CONNECTIONSTRING ?? 'mongodb://localhost:27017/fig',
    username: process.env.MONGO_USERNAME ?? 'admin',
    password: process.env.MONGO_PASSWORD ?? 'admin',
  };
  await MongooseClient.connect(options);

  const app = await NestFactory.create(AppModule);

  app.use(cookieParser(process.env.COOKIE_SECRET ?? 'secret'));

  app.setGlobalPrefix('api/v1');

  app.useGlobalPipes(new ValidationPipe());

  app.enableCors();

  const config = new DocumentBuilder()
    .setTitle('FIG api')
    .setDescription('An api for FIG client')
    .setVersion('1.0')
    .addCookieAuth('uid')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swagger', app, document);

  await app.listen(process.env.PORT);
}
bootstrap();
