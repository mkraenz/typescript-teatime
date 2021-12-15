import { Module, ValidationPipe } from '@nestjs/common';
import { APP_GUARD, APP_PIPE } from '@nestjs/core';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { GqlAuthGuard } from './auth/gql.auth.guard';
import { OrdersModule } from './orders/orders.module';
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
    OrdersModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_PIPE,
      useValue: new ValidationPipe({ transform: true }),
    },
    {
      provide: APP_GUARD,
      // Important: only graphql requests work now. Requests to controllers receive 500 errors
      // TODO: avoid resulting: TypeError: Cannot read property 'headers' of undefined
      useClass: GqlAuthGuard,
    },
  ],
})
export class AppModule {}
