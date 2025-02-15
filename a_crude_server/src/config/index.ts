import { config as dotenvConfig } from 'dotenv';
dotenvConfig();

export const config = {
    port: process.env.PORT ?? 3000,
    db: {
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
    },
  };