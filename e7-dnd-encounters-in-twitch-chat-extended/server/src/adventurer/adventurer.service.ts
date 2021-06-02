import { Injectable } from '@nestjs/common';
import { ReturnModelType } from '@typegoose/typegoose';
import { InjectModel } from 'nestjs-typegoose';
import { CreateAdventurerDto } from '../adventurer/create-adventurer.dto';
import { DuplicateEntityException } from '../common/exceptions/duplicate-entity.exception';
import { Adventurer } from './adventurer.schema';

@Injectable()
export class AdventurerService {
  constructor(
    @InjectModel(Adventurer)
    private adventurerModel: ReturnModelType<typeof Adventurer>,
  ) {}

  async create(createAdventurerDto: CreateAdventurerDto): Promise<Adventurer> {
    const adventurer = new this.adventurerModel(createAdventurerDto);
    try {
      return await adventurer.save({ validateBeforeSave: true });
    } catch (error) {
      const isDuplicationError = error.message.includes(
        'E11000 duplicate key error',
      );
      if (isDuplicationError) {
        throw new DuplicateEntityException(error.keyValue);
      }
      throw error;
    }
  }

  async findAll(): Promise<Adventurer[]> {
    return this.adventurerModel.find().exec();
  }

  findOne(username: string) {
    return this.adventurerModel.findOne({ username }).exec();
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
