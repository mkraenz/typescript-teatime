import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Tea } from './entities/tea.entity';

@Injectable()
export class TeasService {
  constructor(
    @InjectRepository(Tea) private readonly teaRepo: Repository<Tea>,
  ) {}

  async findAllOrFail(ids: string[]) {
    const teas = await this.teaRepo.findByIds(ids);
    if (teas.length !== ids.length) {
      throw new Error('Not all teas found');
    }
    return teas;
  }
}
