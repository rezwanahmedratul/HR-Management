import { registerAs } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export default registerAs(
  'database',
  (): TypeOrmModuleOptions => ({
    type: 'mysql',
    host: process.env.DB_HOST || '127.0.0.1',
    port: parseInt(process.env.DB_PORT || '3306', 10),
    username: process.env.DB_USERNAME || 'hr_user',
    password: process.env.DB_PASSWORD || 'hr_password',
    database: process.env.DB_DATABASE || 'hr_db',
    autoLoadEntities: true,
    synchronize: false,
    logging: process.env.NODE_ENV === 'development',
  }),
);
