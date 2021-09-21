import { NestFactory } from '@nestjs/core';
import { Logger } from '@nestjs/common';

import * as config from 'config';

import { AppModule } from './app.module';

async function bootstrap() {
  const SERVER_CONFIG = config.get('server');
  const logger = new Logger('NestApplication');
  const app = await NestFactory.create(AppModule);

  await app.listen(SERVER_CONFIG.port);

  logger.log(`Application is running on port ${SERVER_CONFIG.port}`);
}

bootstrap();
