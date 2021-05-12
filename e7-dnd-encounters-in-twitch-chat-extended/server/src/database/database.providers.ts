import { Provider } from '@nestjs/common';
import * as mongoose from 'mongoose';

export const databaseProviders: Provider[] = [
  {
    provide: 'DATABASE_CONNECTION',
    useFactory: (): Promise<typeof mongoose> =>
      mongoose.connect('mongodb://localhost:27017/typescriptteatime'),
  },
];
