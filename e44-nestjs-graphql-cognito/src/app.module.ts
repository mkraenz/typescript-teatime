import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { GqlAuthGuard } from './auth/gql.auth.guard';
import { TeasModule } from './teas/teas.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      synchronize: true,
      database: './db.sqlite',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
    }),
    GraphQLModule.forRoot({
      autoSchemaFile: 'schema.gql',
    }),
    AuthModule,
    TeasModule,
  ],
  controllers: [AppController],
  providers: [
    {
      provide: APP_GUARD,
      // Important: only graphql requests work now. Requests to controllers receive 500 errors
      // TODO: avoid resulting: TypeError: Cannot read property 'headers' of undefined
      useClass: GqlAuthGuard,
    },
    AppService,
  ],
})
export class AppModule {}
