import {
  Authorize,
  FilterableField,
  Relation,
} from '@nestjs-query/query-graphql';
import { Field, ID, ObjectType } from '@nestjs/graphql';
import { OrderStatus } from '../entities/order-status.enum';
import { OrderItemDto } from './order-item.dto';

@Authorize({
  authorize: (ctx: { req: { user: { sub: string } } }) => {
    return { userId: { eq: ctx.req.user.sub } };
  },
})
@Relation('items', () => OrderItemDto, {
  disableRemove: true,
  disableUpdate: true,
})
@ObjectType('Order')
export class OrderDto {
  @Field(() => ID)
  id: string;

  @FilterableField(() => ID)
  userId: string;

  @FilterableField(() => OrderStatus)
  status: OrderStatus;
}
