import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TeasModule } from './teas/teas.module';

@Module({
  imports: [TeasModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
