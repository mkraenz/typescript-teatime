import { Authorize, FilterableField } from '@nestjs-query/query-graphql';
import { Field, ID, Int, ObjectType } from '@nestjs/graphql';
import { JwtPayload } from 'jsonwebtoken';

@ObjectType('CartItem')
export class CartItemDto {
  static from(item: { productId: string; amount: number }): CartItemDto {
    const dto = new CartItemDto();
    dto.productId = item.productId;
    dto.amount = item.amount;
    return dto;
  }

  @Field(() => ID)
  productId: string;

  @Field(() => Int)
  amount: number;
}

@ObjectType('Cart')
@Authorize({
  authorize: (context: { req: { user: JwtPayload } }) => {
    return {};
  },
})
export class CartDto {
  @FilterableField(() => ID)
  id: string;

  @Field(() => ID)
  userId: string;

  // also see resolver
}
