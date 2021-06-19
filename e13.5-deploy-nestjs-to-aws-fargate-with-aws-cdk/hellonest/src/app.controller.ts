import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getMessages() {
    return this.appService.getMessages();
  }

  @Get('hello')
  getHello() {
    return this.appService.getHello();
  }

  @Post('post')
  postTest(@Body() body: any): string {
    console.log('post works', body);
    return `post works nicely. You posted:\n${JSON.stringify(body, null, 2)}`;
  }
}
