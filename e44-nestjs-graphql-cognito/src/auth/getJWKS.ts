import { InternalServerErrorException } from '@nestjs/common';
import axios from 'axios';
import * as jwkToPem from 'jwk-to-pem';
import { isRs256JWK, JWKS } from './jwks';

// TODO move into config service and env
export const cognitoUserPoolUrl =
  'https://cognito-idp.eu-central-1.amazonaws.com/eu-central-1_rUHhN3QUc';

export const getJwksAsPem = async () => {
  // keys are cached thanks to nestjs factory provider
  const { data } = await axios.get<JWKS>(
    `${cognitoUserPoolUrl}/.well-known/jwks.json`,
  );
  if (!data.keys.every(isRs256JWK)) {
    throw new InternalServerErrorException('Invalid JWKS');
  }
  const jwksAsPem = data.keys.reduce(
    (acc, key) => ({ ...acc, [key.kid]: jwkToPem(key) }),
    {} as { [kid: string]: string },
  );
  return jwksAsPem;
};
