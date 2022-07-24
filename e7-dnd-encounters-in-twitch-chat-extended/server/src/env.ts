import { Logger } from '@nestjs/common';

export interface Env {
  DATABASE_URL?: string;
}

const logger = new Logger('Config');

export function toConfig(env: Env) {
  if (!env.DATABASE_URL)
    logger.warn('DATABASE_URL is not set. Connecting to localhost:27017');

  return {
    database: {
      url: `${env.DATABASE_URL}`,
      replicaSet: 'rs0',
      dbName: 'teawars',
    },
  };
}
