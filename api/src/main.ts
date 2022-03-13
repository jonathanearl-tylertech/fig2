import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import dotenv from 'dotenv';
import { ValidationPipe } from '@nestjs/common';
import { MongooseClient } from 'src/mongoose/mongoose-client';

dotenv.config();

async function bootstrap() {
  const options = { 
    connectionString: process.env.MONGO_CONNECTIONSTRING,
    username: process.env.MONGO_USERNAME,
    password: process.env.MONGO_PASSWORD,
  };
  await MongooseClient.connect(options);
  const app = await NestFactory.create(AppModule);
  
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

  await app.listen(process.env.PORT ?? 5000);
}
bootstrap();
