import {
  Controller,
  Get,
  Headers,
  UnauthorizedException,
} from '@nestjs/common';
import axios from 'axios';
import * as jsonwebtoken from 'jsonwebtoken';
import * as jwkToPem from 'jwk-to-pem';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('/login')
  async login(@Headers('Authorization') bearerToken: string) {
    console.log(bearerToken);
    const jwtoken = bearerToken.replace(/^Bearer /, '');
    await verifyJwt(jwtoken);
    return true;
  }
}

interface JWKS {
  keys: {
    alg: string;
    e: string;
    kid: string;
    kty: 'RSA';
    n: string;
    use: 'sig';
  }[];
}

function isJWK(key: unknown): key is JWKS {
  // TODO implement
  return true;
}
const cognitoUserPoolUrl =
  'https://cognito-idp.eu-central-1.amazonaws.com/eu-central-1_rUHhN3QUc';

/** @see https://docs.aws.amazon.com/cognito/latest/developerguide/amazon-cognito-user-pools-using-tokens-verifying-a-jwt.html */
async function verifyJwt(requestToken: string) {
  const decodedToken = jsonwebtoken.decode(requestToken, { complete: true });
  const pem = await getJWKAsPem();

  try {
    const result = jsonwebtoken.verify(
      requestToken,
      pem,
    ) as jsonwebtoken.JwtPayload;

    // verify claims. Expiry is checked by jsonwebtoken.verify
    if (result.iss !== cognitoUserPoolUrl) {
      throw new UnauthorizedException('Invalid token');
    }
    if (result.token_use !== 'access') {
      throw new UnauthorizedException('Invalid token_use');
    }

    // Case user was deleted: To ensure that token data is **always** up to date, verify against Cognito user pool directly. Because of token expiration, after 1 hour, the token expires and thus the backend would also not allow any requests from the user.
    // get User's account status from Cognito and assert status === 'CONFIRMED'
  } catch (error) {
    if (error instanceof jsonwebtoken.TokenExpiredError) {
      throw new UnauthorizedException('Token expired');
    }
    throw error;
  }

  async function getJWKAsPem() {
    // TODO cache the JWKS. See https://github.com/awslabs/aws-support-tools/blob/b12de349cb45f9d27ff78314d9a0e3cf643ea551/Cognito/decode-verify-jwt/decode-verify-jwt.ts#L58
    const { data } = await axios.get<JWKS>(
      `${cognitoUserPoolUrl}/.well-known/jwks.json`,
    );
    const key = data.keys.find((key) => key.kid === decodedToken?.header.kid);
    if (!isJWK(key)) {
      throw new UnauthorizedException('Invalid token');
    }
    const pem = jwkToPem(key);
    return pem;
  }
}
