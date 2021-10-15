import { Module } from '@nestjs/common';
import { TeasController } from './teas.controller';
import { TeasService } from './teas.service';

@Module({
  controllers: [TeasController],
  providers: [TeasService],
})
export class TeasModule {}
