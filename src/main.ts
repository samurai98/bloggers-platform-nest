import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app.module';
import { configuration } from './config/configuration';
import { BadRequestExceptionFilter } from './common/filters';
import { validationOptions } from './common/pipes';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors();
  app.useGlobalPipes(new ValidationPipe(validationOptions));
  app.useGlobalFilters(new BadRequestExceptionFilter());

  await app.listen(configuration().PORT);
}

bootstrap();
