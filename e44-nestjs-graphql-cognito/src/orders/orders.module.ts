import { NestjsQueryGraphQLModule } from '@nestjs-query/query-graphql';
import { NestjsQueryTypeOrmModule } from '@nestjs-query/query-typeorm';
import { Module } from '@nestjs/common';
import { TeasModule } from '../teas/teas.module';
import { CreateOrderInput } from './dto/create-order.input';
import { OrderDto } from './dto/order.dto';
import { Order } from './entities/order.entity';
import { OrderResolver } from './order.resolver';
import { OrdersService } from './orders.service';

@Module({
  imports: [
    NestjsQueryGraphQLModule.forFeature({
      imports: [NestjsQueryTypeOrmModule.forFeature([Order])],
      resolvers: [
        {
          DTOClass: OrderDto,
          EntityClass: Order,
          CreateDTOClass: CreateOrderInput,
          enableTotalCount: true,
          create: { disabled: true },
        },
      ],
    }),
    TeasModule,
  ],
  providers: [OrderResolver, OrdersService],
})
export class OrdersModule {}
