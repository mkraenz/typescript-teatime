import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly users: Repository<User>,
  ) {}

  async create(dto: CreateUserDto) {
    const user = User.from(dto);
    await user.save();
    return user;
  }

  findAll() {
    return this.users.find();
  }

  findOne(id: number) {
    return this.users.findOne(id);
  }

  async update(id: string, dto: UpdateUserDto) {
    const x = await this.users.update(id, dto)
    return this.users.findOneOrFail(id);
  }

  async remove(id: string) {
    const user = await this.users.findOneOrFail(id);
    await user.remove();
  }
}
