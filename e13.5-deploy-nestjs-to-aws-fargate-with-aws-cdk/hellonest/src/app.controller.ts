import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { CreateCatDto } from './create-cat.dto';

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

  @Get('cats')
  getCats() {
    return this.appService.findAll();
  }

  @Post('cats')
  createCat(@Body() cat: CreateCatDto) {
    return this.appService.create(cat);
  }

  @Post('post')
  postTest(@Body() body: any): string {
    console.log('post works', body);
    return `post works nicely. You posted:\n${JSON.stringify(body, null, 2)}`;
  }
}
