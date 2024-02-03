/* eslint-disable prettier/prettier */
import { registerAs } from '@nestjs/config';
import { config as dotenvConfig } from 'dotenv';
import { DataSource, DataSourceOptions } from 'typeorm';
dotenvConfig({ path: '.env' });
const config = {
  type: 'postgres',
  host: 'localhost',
      port: 5432,
      password: 'sandhya@1234',
      username: 'postgres',
      database: 'Hotel',
  entities: ['dist/**/*.entity{.ts,.js}'],
  migrations: ['dist/migrations/*{.ts,.js}'],
  logging: true,
  autoLoadEntities: true,
  synchronize: false,
  migrationsRun: true,
};

export default registerAs('typeorm', () => config);
// eslint-disable-next-line prettier/prettier
export const connectionSource = new DataSource(
  config as DataSourceOptions,
);
