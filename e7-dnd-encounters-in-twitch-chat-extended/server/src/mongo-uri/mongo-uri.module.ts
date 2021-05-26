import { Module } from '@nestjs/common';

const provider = {
  provide: 'MONGO_URI',
  useFactory: () => 'mongodb://localhost:27017/typescriptteatime',
};

@Module({
  providers: [provider],
  exports: [provider],
})
export class MongoUriModule {}
