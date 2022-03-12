import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import dotenv from 'dotenv';
import redis from 'redis';
import session from 'express-session';
import connectRedis from 'connect-redis';
import { ValidationPipe } from '@nestjs/common';

let RedisStore = connectRedis(session);
let redisClient = redis.createClient();
dotenv.config();

const { WEBAPI_PORT, REDIS_SECRET } = process.env;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  app.setGlobalPrefix('api/v1');
  
  app.useGlobalPipes(new ValidationPipe());

  app.enableCors();

  app.use(
    session({
      store: new RedisStore({ client: redisClient }),
      secret: REDIS_SECRET,
      saveUninitialized: false,
      resave: false,
    }),
  );

  const config = new DocumentBuilder()
    .setTitle('FIG api')
    .setDescription('An api for FIG client')
    .setVersion('1.0')
    .addBearerAuth({ type: 'http', scheme: 'bearer', bearerFormat: 'JWT' }, 'access-token')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swagger', app, document);

  await app.listen(WEBAPI_PORT ? WEBAPI_PORT : 5000);
}
bootstrap();
