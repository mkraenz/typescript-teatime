import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { CognitoJwtStrategy } from './cognito-jwt.strategy';
import { getJwksAsPem } from './getJWKS';

@Module({
  // TODO do we need the PassportModule?
  imports: [PassportModule],
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
