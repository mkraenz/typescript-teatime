import { Injectable } from '@nestjs/common';
import { ChatUserstate, Client } from 'tmi.js';

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

  constructor() {
    this.twitchClient = new Client(tmiConfig);
    this.twitchClient.connect();
    this.twitchClient.on('message', this.handleMessage.bind(this));
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
