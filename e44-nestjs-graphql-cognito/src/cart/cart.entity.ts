import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

type CartItem = {
  productId: string;
  amount: number;
};

@Entity()
export class Cart extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text')
  userId: string;

  @Column('jsonb', { default: [] })
  items: CartItem[];
}
