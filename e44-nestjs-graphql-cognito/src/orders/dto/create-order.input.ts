import { InputType, PickType } from '@nestjs/graphql';
import { OrderDto } from './order.dto';

@InputType()
export class CreateOrderInput extends PickType(
  OrderDto,
  ['userId'],
  InputType,
) {
  // TODO add orderItems
  // TODO remove userId from input, instead derive it from the current user
}
