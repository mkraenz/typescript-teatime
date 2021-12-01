import { Field, Float, ID, Int, ObjectType } from '@nestjs/graphql';

@ObjectType('OrderItem')
export class OrderItemDto {
  @Field(() => ID)
  id: string;

  @Field(() => ID)
  productId: string;

  @Field(() => Float)
  unitPrice: number;

  @Field(() => Int)
  quantity: number;
}
