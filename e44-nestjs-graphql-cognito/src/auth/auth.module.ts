import { Module } from '@nestjs/common';
import { CognitoJwtStrategy } from './cognito-jwt.strategy';
import { getJwksAsPem } from './getJWKS';

@Module({
  providers: [
    {
      provide: 'JWKS',
      useFactory: getJwksAsPem,
    },
    CognitoJwtStrategy,
  ],
  exports: [],
})
export class AuthModule {}
