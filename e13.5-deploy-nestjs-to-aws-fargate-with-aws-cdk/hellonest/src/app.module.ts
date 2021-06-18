import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Cat, CatSchema } from './cat.schema.';

@Module({
  imports: [
    MongooseModule.forRoot(
      process.env.DATABASE_URL!,
      process.env.DATABASE_USE_TLS === 'true'
        ? {
            tls: true,
            tlsCAFile: 'rds-combined-ca-bundle.pem',
            dbName: 'teatime-turnbased-battles',
          }
        : undefined,
    ),
    MongooseModule.forFeature([{ name: Cat.name, schema: CatSchema }]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
