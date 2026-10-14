import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module.js';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import compression from 'compression';
import { ValidationPipe } from '@nestjs/common';
import SwaggerConfig from './configs/swagger.config.js';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');

  app.use(helmet());
  app.use(cookieParser());
  app.use(compression());

  app.enableCors({
    origin: ['http://localhost:3000'],
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
  });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  SwaggerConfig.setup(app);

  await app.listen(process.env.PORT ?? 3000);
}
await bootstrap();
