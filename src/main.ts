import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  dotenv.config();
  const PORT = Number(process.env.PORT) || 4000;

  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    cors: true,
  });
  await app.listen(PORT);
  app.useGlobalPipes(new ValidationPipe());
}
bootstrap();
