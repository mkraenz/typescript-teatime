import { Module } from '@nestjs/common';
import { toConfig } from '../env';

const provider = {
  provide: 'MONGO_URI',
  useFactory: () => {
    const env = process.env;
    const cfg = toConfig(env);
    if (cfg.DATABASE_USE_TLS) {
      return `mongodb://${cfg.database.host}:${cfg.database.port}/teawars?retryWrites=false`;
    }
    return 'mongodb://localhost:27017/teawars';
  },
};

@Module({
  providers: [provider],
  exports: [provider],
})
export class MongoUriModule {}
