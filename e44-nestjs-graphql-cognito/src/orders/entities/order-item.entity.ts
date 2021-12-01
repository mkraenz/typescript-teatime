import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Order } from './order.entity';

@Entity()
export class OrderItem {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  productId: string;

  /** In Euro */
  @Column('float')
  unitPrice: number;

  @Column('int')
  quantity: number;

  @ManyToOne((_) => Order, (order) => order.items)
  order: Order;

  /** In Euro */
  get totalPrice() {
    return this.quantity * this.unitPrice;
  }
}
