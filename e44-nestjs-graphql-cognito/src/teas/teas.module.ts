import { NestjsQueryGraphQLModule } from '@nestjs-query/query-graphql';
import { NestjsQueryTypeOrmModule } from '@nestjs-query/query-typeorm';
import { Module } from '@nestjs/common';
import { Public } from '../auth/public.decorator';
import { TeaDto } from './dto/tea.dto';
import { Tea } from './entities/tea.entity';
import { TeasService } from './teas.service';

@Module({
  imports: [
    NestjsQueryGraphQLModule.forFeature({
      imports: [NestjsQueryTypeOrmModule.forFeature([Tea])],
      resolvers: [
        {
          DTOClass: TeaDto,
          EntityClass: Tea,
          enableTotalCount: true,
          decorators: [Public()],
        },
      ],
    }),
  ],
  providers: [TeasService],
  exports: [TeasService],
})
export class TeasModule {}
