import { NestjsQueryGraphQLModule } from '@nestjs-query/query-graphql';
import { NestjsQueryTypeOrmModule } from '@nestjs-query/query-typeorm';
import { Module } from '@nestjs/common';
import { Public } from '../auth/public.decorator';
import { Cart } from './cart.entity';
import { CartResolver } from './cart.resolver';
import { CartDto } from './dto/cart.dto';
import { CreateCardInput } from './dto/create-cart.dto';

// TODO E58 use custom resolver instead of nestjs query
@Module({
  imports: [
    NestjsQueryGraphQLModule.forFeature({
      imports: [NestjsQueryTypeOrmModule.forFeature([Cart])],
      resolvers: [
        {
          DTOClass: CartDto,
          EntityClass: Cart,
          CreateDTOClass: CreateCardInput,
          enableTotalCount: true,
          decorators: [Public()], // TODO remove this
        },
      ],
    }),
  ],
  providers: [CartResolver],
})
export class CartModule {}
