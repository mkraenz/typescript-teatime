import { Field, InputType } from '@nestjs/graphql';
import { Type } from 'class-transformer';
import { CreateOrderItemInput } from './create-order-item.input';

@InputType()
export class CreateOrderInput {
  @Type(() => CreateOrderItemInput)
  @Field(() => [CreateOrderItemInput])
  items: CreateOrderItemInput[];
}
