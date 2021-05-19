import { Injectable } from '@nestjs/common';
import { ReturnModelType } from '@typegoose/typegoose';
import { InjectModel } from 'nestjs-typegoose';
import { CreateAdventurerDto } from '../adventurer/create-adventurer.dto';
import { Adventurer } from './adventurer.interface';
import { AdventurerClass } from './adventurer.schema';

@Injectable()
export class AdventurerService {
  constructor(
    @InjectModel(AdventurerClass)
    private adventurerModel: ReturnModelType<typeof AdventurerClass>,
  ) {}

  async create(createAdventurerDto: CreateAdventurerDto): Promise<Adventurer> {
    const adventurer = new this.adventurerModel(createAdventurerDto);
    return adventurer.save({ validateBeforeSave: true });
  }

  async findAll(): Promise<Adventurer[]> {
    return this.adventurerModel.find().exec();
  }

  async update(
    username: string,
    update: {
      experience: number;
    },
  ): Promise<Adventurer> {
    const adventurer = await this.adventurerModel.findOne({ username });
    if (!adventurer) {
      throw new Error('Entity not found');
    }
    adventurer.experience = update.experience;
    return adventurer.save();
  }

  async deleteAll() {
    return this.adventurerModel.remove({});
  }
}
