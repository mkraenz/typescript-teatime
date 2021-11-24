import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import * as jwt from 'jsonwebtoken';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { cognitoUserPoolUrl, getJwksAsPem } from './getJWKS';

type Awaited<T> = T extends Promise<infer U> ? U : never;

@Injectable()
export class CognitoJwtStrategy extends PassportStrategy(
  Strategy,
  'cognito-jwt',
) {
  constructor(@Inject('JWKS') jwks: Awaited<ReturnType<typeof getJwksAsPem>>) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: true,
      secretOrKeyProvider: (
        _request: any,
        rawJwt: string,
        done: (err: Error | undefined, key: string) => void,
      ) => {
        const token = jwt.decode(rawJwt, { complete: true });
        if (!token) throw new UnauthorizedException('Invalid token');
        const tokenKid = token.header.kid;
        if (!tokenKid) throw new UnauthorizedException('Invalid token');
        if (!(tokenKid in jwks))
          throw new UnauthorizedException('Invalid token');
        const key = jwks[tokenKid];
        return done(undefined, key);
      },
    });
  }

  /** @see https://docs.aws.amazon.com/cognito/latest/developerguide/amazon-cognito-user-pools-using-tokens-verifying-a-jwt.html */
  async validate(
    payload: jwt.JwtPayload & { token_use?: 'access' | 'id' },
  ): Promise<any> {
    // verify claims. Expiry is checked by jsonwebtoken.verify
    if (payload.iss !== cognitoUserPoolUrl) {
      throw new UnauthorizedException('Invalid token');
    }
    // TODO change to 'access'
    if (payload.token_use !== 'access') {
      throw new UnauthorizedException('Invalid token_use');
    }
    return payload;
  }
}
