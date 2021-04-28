import { Inject, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { CreateAdventurerDto } from '../adventurer/create-adventurer.dto';
import { Adventurer } from './adventurer.interface';

@Injectable()
export class AdventurerService {
  constructor(
    @Inject('ADVENTURER_MODEL') private adventurerModel: Model<Adventurer>,
  ) {}

  async create(createAdventurerDto: CreateAdventurerDto): Promise<Adventurer> {
    const adventurer = new this.adventurerModel(createAdventurerDto);
    return adventurer.save({ validateBeforeSave: true });
  }

  async findAll(): Promise<Adventurer[]> {
    return this.adventurerModel.find().exec();
  }
}
