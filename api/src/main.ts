import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';

dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(cookieParser(process.env.COOKIE_SECRET));

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
