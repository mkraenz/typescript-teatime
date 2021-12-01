import { registerEnumType } from '@nestjs/graphql';

export enum OrderStatus {
  Created = 'created',
  Paid = 'paid',
  Shipped = 'shipped',
  Filled = 'filled',
  Cancelled = 'cancelled',
}

registerEnumType(OrderStatus, {
  name: 'OrderStatus',
});
