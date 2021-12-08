import { FilterableField } from '@nestjs-query/query-graphql';
import { Field, Float, ID, Int, ObjectType } from '@nestjs/graphql';

@ObjectType('OrderItem')
export class OrderItemDto {
  @FilterableField(() => ID)
  id: string;

  @Field(() => ID)
  productId: string;

  @Field(() => Float)
  unitPrice: number;

  @Field(() => Int)
  quantity: number;
}
