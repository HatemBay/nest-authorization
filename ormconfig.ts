import { SqliteConnectionOptions } from 'typeorm/driver/sqlite/SqliteConnectionOptions';

const config: SqliteConnectionOptions = {
  type: 'sqlite',
  database: 'db',
  entities: ['dist/**/*.entity.{js,ts}'],
  synchronize: true, // to be changed to false in production
  logging: true,
};

export default config;
