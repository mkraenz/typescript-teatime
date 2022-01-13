import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Tea {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 100 })
  name: string;

  @Column('float')
  price: number;

  @Column('integer')
  bestAtTemperature: number;

  @Column('text')
  tags = '';

  @Column('text', {
    default:
      'https://images.unsplash.com/photo-1611836579732-d4dd63dc5492?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1306&q=80',
  })
  imageUrl: string;

  @Column('text', { default: '' })
  description: string;
}
