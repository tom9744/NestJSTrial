import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { privateInformation } from './typeorm.private';

export const typeORMConfig: TypeOrmModuleOptions = {
  // Database Type
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: privateInformation.password,
  database: 'board-app',

  // Entities to be loaded for this connection
  entities: [__dirname + '/../**/*.entity.{js,ts}'],

  // Set this option to 'false' on production
  synchronize: true,
};
