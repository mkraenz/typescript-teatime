import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { OrderItem } from './order-item.entity';
import { OrderStatus } from './order-status.enum';

@Entity()
export class Order extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  /** sub coming from AWS Cognito */
  @Column()
  userId: string;

  @Column({ enum: OrderStatus, default: OrderStatus.Created })
  status: OrderStatus;

  @OneToMany(() => OrderItem, (orderItem) => orderItem.order, {
    cascade: true,
  })
  items: OrderItem[];

  /** in Euro */
  get totalPrice() {
    return this.items.reduce((acc, b) => acc + b.totalPrice, 0);
  }
}
