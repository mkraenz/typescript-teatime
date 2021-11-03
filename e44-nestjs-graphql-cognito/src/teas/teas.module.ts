import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tea } from './entities/tea.entity';
import { TeasResolver } from './teas.resolver';
import { TeasService } from './teas.service';

@Module({
  imports: [TypeOrmModule.forFeature([Tea])],
  providers: [TeasResolver, TeasService],
})
export class TeasModule {}
