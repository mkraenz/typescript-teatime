export interface Env {
  DATABASE_URL: string;
  DATABASE_PASSWORD: string;
  DATABASE_USERNAME: string;
  DATABASE_USE_TLS: string;
}

export function assertEnv(env: Partial<Env>): asserts env is Env {
  if (!env.DATABASE_URL) throw new Error('Missing DATABASE_URL');
  if (!env.DATABASE_PASSWORD) throw new Error('Missing DATABASE_PASSWORD');
  if (!env.DATABASE_USERNAME) throw new Error('Missing DATABASE_USERNAME');
  if (env.DATABASE_USE_TLS !== undefined && env.DATABASE_USE_TLS !== 'true')
    throw new Error(`DATABASE_USE_TLS should either be undefined or 'true'`);
}
