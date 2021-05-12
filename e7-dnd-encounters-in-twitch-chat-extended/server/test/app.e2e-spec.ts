import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { MongoMemoryServer } from 'mongodb-memory-server';
import * as mongoose from 'mongoose';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;
  let mongodb: MongoMemoryServer;

  beforeEach(async () => {
    mongodb = new MongoMemoryServer();
    const inMemoryMongodbUri = await mongodb.getUri();
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideProvider('DATABASE_CONNECTION')
      .useFactory({
        factory: (): Promise<typeof mongoose> =>
          mongoose.connect(inMemoryMongodbUri),
      })
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterEach(async () => {
    await app.close();
    await mongoose.disconnect();
    await mongodb.stop();
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('Hello World!');
  });
});
