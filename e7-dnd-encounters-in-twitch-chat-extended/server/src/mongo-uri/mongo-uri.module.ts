import { Module } from '@nestjs/common';
import { toConfig } from '../env';

const provider = {
  provide: 'MONGO_URI',
  useFactory: () => {
    const env = process.env;
    const cfg = toConfig(env);
    return (
      cfg.database.url ?? `mongodb://localhost:27017/${cfg.database.dbName}`
    );
  },
};

@Module({
  providers: [provider],
  exports: [provider],
})
export class MongoUriModule {}
