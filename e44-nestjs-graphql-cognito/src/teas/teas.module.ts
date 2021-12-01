import { NestjsQueryGraphQLModule } from '@nestjs-query/query-graphql';
import { NestjsQueryTypeOrmModule } from '@nestjs-query/query-typeorm';
import { Module } from '@nestjs/common';
import { TeaDto } from './dto/tea.dto';
import { Tea } from './entities/tea.entity';

@Module({
  imports: [
    NestjsQueryGraphQLModule.forFeature({
      imports: [NestjsQueryTypeOrmModule.forFeature([Tea])],
      resolvers: [
        { DTOClass: TeaDto, EntityClass: Tea, enableTotalCount: true },
      ],
    }),
  ],
  providers: [],
})
export class TeasModule {}
