export interface JWKS {
  keys: {
    alg: string;
    e: string;
    kid: string;
    kty: 'RSA';
    n: string;
    use: 'sig';
  }[];
}

function isNonEmptyString(val: any): val is string {
  return typeof val === 'string' && !!val;
}

/** @see https://docs.aws.amazon.com/cognito/latest/developerguide/amazon-cognito-user-pools-using-tokens-verifying-a-jwt.html */
export function isRs256JWK(key: any): key is JWKS['keys'][0] {
  return (
    isNonEmptyString(key.kid) &&
    key.alg === 'RS256' &&
    key.kty === 'RSA' &&
    isNonEmptyString(key.e) &&
    isNonEmptyString(key.n) &&
    key.use === 'sig'
  );
}
