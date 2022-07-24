import { pick } from 'lodash';
import {
  BaseEntity,
  Column,
  Entity,
  Index,
  PrimaryGeneratedColumn,
} from 'typeorm';

export interface Address {
  street: string;
  city: string;
  zip: string;
  country: string;
}

@Entity()
export class User extends BaseEntity {
  static from(dto: {
    firstname: string;
    lastname: string;
    email: string;
    address: Address;
  }) {
    const user = new User();
    user.firstname = dto.firstname;
    user.lastname = dto.lastname;
    user.email = dto.email;
    user.address = dto.address;
    return user;
  }

  update(dto: Partial<User>) {
    const updateData = pick(dto, 'firstname', 'lastname', 'email', 'address');
    Object.assign(this, updateData);
  }

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('jsonb')
  address: {
    street: string;
    city: string;
    zip: string;
    country: string;
  };

  @Column('varchar', { length: 255 })
  firstname: string;

  @Column('varchar', { length: 255 })
  lastname: string;

  @Index({ unique: true })
  @Column('varchar', { length: 255 })
  email: string;
}
