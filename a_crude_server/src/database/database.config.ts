import { DB } from './database.type';
import { Pool } from 'pg';
import { CamelCasePlugin, Kysely, PostgresDialect } from 'kysely';
import { config } from '../config';

const dialect = new PostgresDialect({
  pool: new Pool({
    database: config.db.database,
    host: config.db.host,
    user: config.db.user,
    password: config.db.password,
    port: config.db.port,
    max: 10,
  }),
});

export const db = new Kysely<DB>({
  dialect,
  log: ['query', 'error'],
  plugins: [
    new CamelCasePlugin()
  ]
});
