import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  private hitcount = 0;

  getHello(): string {
    this.hitcount++;
    console.log('current count', this.hitcount);
    return `Welcome to TypeScript Teatime!\nEndpoint called ${this.hitcount} times.`;
  }
}
