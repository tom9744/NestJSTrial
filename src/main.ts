import { NestFactory } from '@nestjs/core';
import { Logger } from '@nestjs/common';

import { AppModule } from './app.module';

async function bootstrap() {
  const logger = new Logger('NestApplication');
  const app = await NestFactory.create(AppModule);
  const portNumber = 3000;

  await app.listen(portNumber);

  logger.log(`Application is running on port ${3000}`);
}

bootstrap();
