import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Cat, CatSchema } from './cat.schema.';
import { assertEnv } from './env';

const env = process.env;
assertEnv(env);

@Module({
  imports: [
    MongooseModule.forRoot(
      `mongodb://${env.DATABASE_URL}/teawars?retryWrites=false`,
      env.DATABASE_USE_TLS === 'true'
        ? {
            ssl: true,
            tlsInsecure: true,
            tlsAllowInvalidHostnames: true,
            tlsCAFile: 'rds-combined-ca-bundle.pem',
            auth: {
              password: env.DATABASE_PASSWORD,
              user: env.DATABASE_USERNAME,
            },
            readPreference: 'secondaryPreferred',
            useUnifiedTopology: true,
            retryAttempts: 5,
            useNewUrlParser: true,
            // replicaSet: 'rs0',
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
