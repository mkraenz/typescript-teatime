import { Injectable } from '@nestjs/common';
import { ReturnModelType } from '@typegoose/typegoose';
import { InjectModel } from 'nestjs-typegoose';
import { CreateAdventurerDto } from '../adventurer/create-adventurer.dto';
import { DuplicateEntityException } from '../common/exceptions/duplicate-entity.exception';
import { IEvent } from '../domain/events';
import { Adventurer } from './adventurer.schema';

@Injectable()
export class AdventurerService {
  constructor(
    @InjectModel(Adventurer)
    private adventurerModel: ReturnModelType<typeof Adventurer>,
  ) {}

  async create(createAdventurerDto: CreateAdventurerDto, log: IEvent[] = []) {
    const adventurer = new this.adventurerModel(createAdventurerDto);
    try {
      const savedAdventurer = await adventurer.save();
      savedAdventurer.setLog(log);
      return savedAdventurer;
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

  async findOne(username: string) {
    return this.adventurerModel.findOne({ username }).exec();
  }

  async findOneOrCreate(username: string, log: IEvent[] = []) {
    const adventurer = await this.adventurerModel.findOne({ username }).exec();
    if (adventurer) {
      adventurer.setLog(log);
      return adventurer;
    }
    return this.create({ username }, log);
  }

  async update(
    username: string,
    update: {
      experience?: number;
      hp?: number;
    },
  ): Promise<Adventurer> {
    const adventurer = await this.adventurerModel.findOne({ username });
    if (!adventurer) {
      throw new Error('Entity not found');
    }
    adventurer.experience = update.experience ?? adventurer.experience;
    adventurer.hp = update.hp ?? adventurer.hp;
    return adventurer.save();
  }

  async deleteAll() {
    return this.adventurerModel.remove({});
  }
}
