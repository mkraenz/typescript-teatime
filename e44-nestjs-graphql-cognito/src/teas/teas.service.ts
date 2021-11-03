import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTeaInput } from './dto/create-tea.input';
import { UpdateTeaInput } from './dto/update-tea.input';
import { Tea } from './entities/tea.entity';

@Injectable()
export class TeasService {
  constructor(@InjectRepository(Tea) private readonly teas: Repository<Tea>) {}

  create(input: CreateTeaInput) {
    const tea = this.teas.create(input);
    tea.tags = '';
    return this.teas.save(tea);
  }

  findAll() {
    return this.teas.find();
  }

  findOne(id: string) {
    return this.teas.findOneOrFail(id);
  }

  async update(id: string, input: UpdateTeaInput) {
    const tea = await this.teas.findOneOrFail(id);
    this.teas.merge(tea, input);
    return this.teas.save(tea);
  }

  async remove(id: string) {
    const deleted = await this.teas.findOneOrFail(id);
    await this.teas.delete(deleted);
    return deleted;
  }
}
