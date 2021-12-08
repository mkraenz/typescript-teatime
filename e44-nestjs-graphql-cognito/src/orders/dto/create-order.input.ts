import { Field, InputType, PickType } from '@nestjs/graphql';
import { Type } from 'class-transformer';
import { CreateOrderItemInput } from './create-order-item.input';
import { OrderDto } from './order.dto';

@InputType()
export class CreateOrderInput extends PickType(
  OrderDto,
  // TODO remove userId from input, instead derive it from the current user
  ['userId'],
  InputType,
) {
  @Type(() => CreateOrderItemInput)
  @Field(() => [CreateOrderItemInput])
  items: CreateOrderItemInput[];
}
