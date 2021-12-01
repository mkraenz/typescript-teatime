import { NestjsQueryGraphQLModule } from '@nestjs-query/query-graphql';
import { NestjsQueryTypeOrmModule } from '@nestjs-query/query-typeorm';
import { Module } from '@nestjs/common';
import { CreateOrderInput } from './dto/create-order.input';
import { OrderDto } from './dto/order.dto';
import { OrderItem } from './entities/order-item.entity';
import { Order } from './entities/order.entity';

@Module({
  imports: [
    NestjsQueryGraphQLModule.forFeature({
      imports: [NestjsQueryTypeOrmModule.forFeature([Order, OrderItem])],
      resolvers: [
        {
          DTOClass: OrderDto,
          EntityClass: Order,
          CreateDTOClass: CreateOrderInput,
          enableTotalCount: true,
        },
      ],
    }),
  ],
  providers: [],
})
export class OrdersModule {}
