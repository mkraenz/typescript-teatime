import { Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { Cart } from './cart.entity';
import { CartDto, CartItemDto } from './dto/cart.dto';

@Resolver(() => CartDto)
export class CartResolver {
  @ResolveField(() => [CartItemDto])
  items(@Parent() cart: Cart) {
    return cart.items.map(CartItemDto.from);
  }
}
