import {
  Authorize,
  FilterableField,
  UnPagedRelation,
} from '@nestjs-query/query-graphql';
import { Field, ID, ObjectType } from '@nestjs/graphql';
import { OrderStatus } from '../entities/order-status.enum';
import { OrderItemDto } from './order-item.dto';

@Authorize({
  authorize: (ctx: { req: { user: { sub: string } } }) => {
    return { userId: { eq: ctx.req.user.sub } };
  },
})
@UnPagedRelation('items', () => OrderItemDto, {
  disableRemove: true,
  disableUpdate: true,
  allowFiltering: false,
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
