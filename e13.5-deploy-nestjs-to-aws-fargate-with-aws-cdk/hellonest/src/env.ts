export interface Config {
  DATABASE_USE_TLS: boolean;
  LOCAL_PORT_FORWARD_TO_AWS: boolean;
  database: Required<IDatabaseSecret> & { replicaSet?: 'rs0' };
}

export interface Env {
  /** string 'true' or undefined */
  DATABASE_USE_TLS?: string;
  /** string 'true' or undefined */
  LOCAL_PORT_FORWARD_TO_AWS?: string;
  /**
   * JSON formatted string of
   * {@link IDatabaseSecret}
   */
  DATABASE_AWS_SECRET?: string;
}

/**
 * Example:
 *
 * NOTE: When connecting from local machine to DocumentDB via Local Port Forwarding,
 * set `host: "localhost"`
 * ```
 * {
 *   dbClusterIdentifier:	"dbecc124567-jjqer98765",
 *   password: "2u93hjkjdoaiso239qadadaasdfghjk",
 *   engine: "mongo",
 *   port: 27017,
 *   host: "dbecc124567-jbqer98765.cluster-cabcdefg.eu-west-1.docdb.amazonaws.com",
 *   ssl: true,
 *   username: "myusername"
 * }
 * ```
 */
interface IDatabaseSecret {
  dbClusterIdentifier: string;
  password: string;
  engine: string;
  port: number;
  host: string;
  ssl: boolean;
  username: string;
}

export function toConfig(env: Env): Config {
  if (env.DATABASE_USE_TLS !== undefined && env.DATABASE_USE_TLS !== 'true')
    throw new Error(`DATABASE_USE_TLS should either be undefined or 'true'`);
  if (!env.DATABASE_AWS_SECRET) {
    throw new Error('Missing DATABASE_AWS_SECRET');
  }

  const database: IDatabaseSecret = JSON.parse(env.DATABASE_AWS_SECRET);
  if (
    !(
      database.dbClusterIdentifier &&
      database.password &&
      database.engine &&
      database.port &&
      database.host &&
      database.ssl &&
      database.username
    )
  )
    throw new Error('database secret does not have expected format');

  return {
    DATABASE_USE_TLS: env.DATABASE_USE_TLS === 'true',
    LOCAL_PORT_FORWARD_TO_AWS: env.LOCAL_PORT_FORWARD_TO_AWS === 'true',
    database: env.LOCAL_PORT_FORWARD_TO_AWS
      ? {
          ...database,
          // cannot connect as a replica set via local port forwarding according to docs
          replicaSet: undefined,
        }
      : { ...database, replicaSet: 'rs0' },
  };
}
