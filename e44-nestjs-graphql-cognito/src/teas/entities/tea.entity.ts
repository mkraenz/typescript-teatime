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

  @Column()
  tags: string;
}
