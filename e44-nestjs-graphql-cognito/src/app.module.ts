import { Module, ValidationPipe } from '@nestjs/common';
import { APP_GUARD, APP_PIPE } from '@nestjs/core';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';
import { AuthModule } from './auth/auth.module';
import { CustomAuthGuard } from './auth/custom-auth.guard';
import { OrdersModule } from './orders/orders.module';
import { TeasModule } from './teas/teas.module';

const typeOrmConfig: PostgresConnectionOptions = {
  type: 'postgres' as const,
  synchronize: true,
  entities: [__dirname + '/**/*.entity{.ts,.js}'],
  port: 3142,
  host: 'localhost',
  username: 'postgres',
  password: 'password',
  database: 'postgres',
};

@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
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
      useClass: CustomAuthGuard,
    },
  ],
})
export class AppModule {}
