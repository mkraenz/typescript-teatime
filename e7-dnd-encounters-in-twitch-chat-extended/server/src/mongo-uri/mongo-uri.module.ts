import { Module } from '@nestjs/common';
import { toConfig } from '../env';

const provider = {
  provide: 'MONGO_URI',
  useFactory: () => {
    const env = process.env;
    const cfg = toConfig(env);
    if (cfg.DATABASE_USE_TLS) {
      return `mongodb://${cfg.database.host}:${cfg.database.port}/${cfg.database.dbName}?retryWrites=false`;
    }
    return `mongodb://localhost:27017/${cfg.database.dbName}`;
  },
};

@Module({
  providers: [provider],
  exports: [provider],
})
export class MongoUriModule {}
