import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Cat, CatSchema } from './cat.schema.';
import { toConfig } from './env';

const env = process.env;
const cfg = toConfig(env);

@Module({
  imports: [
    MongooseModule.forRoot(
      `mongodb://${cfg.database.host}:${cfg.database.port}/teawars?retryWrites=false`,
      cfg.DATABASE_USE_TLS
        ? {
            ssl: true,
            tlsInsecure: true,
            tlsAllowInvalidHostnames: true,
            tlsCAFile: 'rds-combined-ca-bundle.pem', // AWS certificate bundle
            auth: {
              password: cfg.database.password,
              user: cfg.database.username,
            },
            readPreference: 'secondaryPreferred',
            useUnifiedTopology: true,
            retryAttempts: 5,
            useNewUrlParser: true,
            replicaSet: cfg.database.replicaSet,
          }
        : {
            useUnifiedTopology: true,
            useNewUrlParser: true,
          },
    ),
    MongooseModule.forFeature([{ name: Cat.name, schema: CatSchema }]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
