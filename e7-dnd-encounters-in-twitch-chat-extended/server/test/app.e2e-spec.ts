import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { MongoMemoryServer } from 'mongodb-memory-server';
import * as mongoose from 'mongoose';
import * as request from 'supertest';
import { UpdateAdventurerDto } from '../src/adventurer/update-adventurer.dto';
import { CreateAdventurerDto } from './../src/adventurer/create-adventurer.dto';
import { GetAdventurerDto } from './../src/adventurer/get-adventurer.dto';
import { AppModule } from './../src/app.module';

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

describe('/adventurers', () => {
  it('initially should GET an empty list of adventurers', async () => {
    await request(app.getHttpServer())
      .get('/adventurers')
      .expect(200)
      .expect([]);
  });

  it('should response with 400 Bad Request for no body send on POST', async () => {
    await request(app.getHttpServer())
      .post('/adventurers')
      .set('Content-Type', 'application/json')
      .expect(400);
  });

  it('should response with 400 Bad Request for integer username on POST', async () => {
    const adventurerDto: CreateAdventurerDto = {
      // @ts-expect-error
      username: 2,
    };

    await request(app.getHttpServer())
      .post('/adventurers')
      .set('Content-Type', 'application/json')
      .send(adventurerDto)
      .expect(400);
  });

  it('should response with 400 Bad Request for empty username on POST', async () => {
    const adventurerDto: CreateAdventurerDto = {
      username: '',
    };

    await request(app.getHttpServer())
      .post('/adventurers')
      .set('Content-Type', 'application/json')
      .send(adventurerDto)
      .expect(400);
  });

  it('should create/POST an adventurer, then GET it', async () => {
    const adventurerDto: CreateAdventurerDto = {
      username: 'Pickle Rick',
    };
    const adventurerRes: GetAdventurerDto = {
      username: 'Pickle Rick',
      experience: 0,
      level: 1,
    };

    await request(app.getHttpServer())
      .post('/adventurers')
      .set('Content-Type', 'application/json')
      .send(adventurerDto)
      .expect(201)
      .expect(adventurerRes);

    await request(app.getHttpServer())
      .get('/adventurers')
      .expect(200)
      .expect([adventurerRes]);
  });

  it('should create/POST an adventurer, DELETE all, then GET empty array', async () => {
    const adventurerDto: CreateAdventurerDto = {
      username: 'Pickle Rick',
    };
    const adventurerRes: GetAdventurerDto = {
      username: 'Pickle Rick',
      experience: 0,
      level: 1,
    };
    await request(app.getHttpServer())
      .post('/adventurers')
      .set('Content-Type', 'application/json')
      .send(adventurerDto)
      .expect(201)
      .expect(adventurerRes);

    await request(app.getHttpServer()).delete('/adventurers').expect(200);

    await request(app.getHttpServer())
      .get('/adventurers')
      .expect(200)
      .expect([]);
  });

  it('should update/PATCH a newly created adventurer', async () => {
    const adventurerCreateDto: CreateAdventurerDto = {
      username: 'Pickle Rick',
    };
    await request(app.getHttpServer())
      .post('/adventurers')
      .set('Content-Type', 'application/json')
      .send(adventurerCreateDto)
      .expect(201);
    const adventurerUpdateDto: UpdateAdventurerDto = {
      experience: 9001,
      username: 'Pickle Rick',
    };
    const adventurerUpdatedRes: GetAdventurerDto = {
      username: 'Pickle Rick',
      experience: 9001,
      level: 1,
    };

    await request(app.getHttpServer())
      .patch('/adventurers')
      .set('Content-Type', 'application/json')
      .send(adventurerUpdateDto)
      .expect(200)
      .expect(adventurerUpdatedRes);
  });

  it('should return 400 Bad Request on update/PATCH for non-integer experience', async () => {
    const adventurerUpdateDto: UpdateAdventurerDto = {
      experience: 9001.1,
      username: 'Pickle Rick',
    };

    await request(app.getHttpServer())
      .patch('/adventurers')
      .set('Content-Type', 'application/json')
      .send(adventurerUpdateDto)
      .expect(400);
  });
});
