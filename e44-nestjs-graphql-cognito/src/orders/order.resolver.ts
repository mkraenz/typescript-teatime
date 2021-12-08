import { BadRequestException } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { CurrentUser, User } from '../auth/current-user.decorator';
import { CreateOrderInput } from './dto/create-order.input';
import { OrderDto } from './dto/order.dto';
import { OrdersService } from './orders.service';

@Resolver(() => OrderDto)
export class OrderResolver {
  constructor(private readonly orders: OrdersService) {}

  @Mutation(() => OrderDto, { name: 'createOrder' })
  async create(
    @Args('input') input: CreateOrderInput,
    @CurrentUser() user: User,
  ) {
    this.assertUniqueProductIds(input);

    const created = await this.orders.create(input, user.sub);
    return created;
  }

  // TODO move uniqueness check to input dto
  private assertUniqueProductIds(input: CreateOrderInput) {
    const teaIds = input.items.map((item) => item.productId);
    if (teaIds.length !== new Set(teaIds).size) {
      throw new BadRequestException('Duplicate productIds');
    }
  }
}
