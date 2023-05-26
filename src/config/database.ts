import { config } from 'dotenv';
config();

const {
  DB_TYPE,
  PGSQL_PORT,
  PGSQL_DBNAME,
  PGSQL_USERNAME,
  PGSQL_PASSWORD,
  MONGODB_PORT,
  MONGODB_DBNAME,
  MONGODB_USERNAME,
  MONGODB_PASSWORD,
  MYSQL_PORT,
  MYSQL_DBNAME,
  MYSQL_USERNAME,
  MYSQL_PASSWORD,
} = process.env;

const db = {
  mysql: {
    type: 'mysql',
    host: 'localhost',
    port: MYSQL_PORT,
    username: MYSQL_USERNAME,
    password: MYSQL_PASSWORD,
    database: MYSQL_DBNAME,
    autoLoadEntities: true,
    synchronize: true,
  },

  pgsql: {
    type: 'postgres',
    host: 'localhost',
    port: PGSQL_PORT,
    username: PGSQL_USERNAME,
    password: PGSQL_PASSWORD,
    database: PGSQL_DBNAME,
    autoLoadEntities: true,
    synchronize: true,
  },

  mongo: {
    type: 'mongodb',
    host: 'localhost',
    port: MONGODB_PORT,
    username: MONGODB_USERNAME,
    password: MONGODB_PASSWORD,
    database: MONGODB_DBNAME,
    autoLoadEntities: true,
    synchronize: true,
  },
};

export const dbConfig = db[DB_TYPE || 'mongo'];
