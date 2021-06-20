import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ChatUserstate, Client } from 'tmi.js';
import { Cat, CatDocument } from './cat.schema.';
import { CreateCatDto } from './create-cat.dto';

const tmiConfig = {
  options: { debug: true },
  connection: {
    reconnect: true,
    secure: true,
  },
  channels: ['typescriptteatime'],
};

@Injectable()
export class AppService {
  private hitcount = 0;
  private allMessages: string[] = [];
  private twitchClient: Client;

  constructor(@InjectModel(Cat.name) private catModel: Model<CatDocument>) {
    this.twitchClient = new Client(tmiConfig);
    this.twitchClient.connect();
    this.twitchClient.on('message', this.handleMessage.bind(this));
  }

  async create(createCatDto: CreateCatDto): Promise<Cat> {
    const createdCat = new this.catModel(createCatDto);
    return createdCat.save();
  }

  async findAll(): Promise<Cat[]> {
    return this.catModel.find().exec();
  }

  getHello(): string {
    this.hitcount++;
    console.log('current count', this.hitcount);
    return `Welcome to TypeScript Teatime!\nEndpoint called ${this.hitcount} times.`;
  }

  private handleMessage(
    channel: string,
    tags: ChatUserstate,
    message: string,
    self: boolean,
  ) {
    if (self) return;
    this.allMessages.push(message);
  }

  getMessages() {
    return this.allMessages;
  }
}
