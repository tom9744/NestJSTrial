import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import * as config from 'config';

const DB_CONFIG = config.get('db');

export const typeORMConfig: TypeOrmModuleOptions = {
  // Database Type
  type: DB_CONFIG.type,
  host: process.env.RDS_HOSTNAME || DB_CONFIG.host,
  port: process.env.RDS_PORT || DB_CONFIG.port,
  username: process.env.RDS_USERNAME || DB_CONFIG.username,
  password: process.env.RDS_PASSWORD || DB_CONFIG.password,
  database: process.env.RDS_DATABASE || DB_CONFIG.database,

  // Entities to be loaded for this connection
  entities: [__dirname + '/../**/*.entity.{js,ts}'],

  // Set this option to 'false' on production
  synchronize: DB_CONFIG.synchronize,
};
