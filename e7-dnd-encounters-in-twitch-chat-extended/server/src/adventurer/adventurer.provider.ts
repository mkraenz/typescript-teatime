import { Provider } from '@nestjs/common';
import { Connection } from 'mongoose';
import { AdventurerSchema } from '../database/schemas/adventurer.schema';

export const adventurerProviders: Provider[] = [
  {
    provide: 'ADVENTURER_MODEL',
    inject: ['DATABASE_CONNECTION'],
    useFactory: (connection: Connection) =>
      connection.model('Adventurer', AdventurerSchema),
  },
];
