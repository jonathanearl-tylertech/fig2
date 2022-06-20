import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as jose from 'jose';
import { randomFillSync } from 'crypto';

@Injectable()
export class JWTEncryptService {
  private secret: any;

  async encrypt(JWT: any) {
    if (!this.secret)
      this.secret = randomFillSync(new Uint8Array(32));

    const jwe = await new jose.EncryptJWT(JWT)
      .setProtectedHeader({ alg: 'dir', enc: 'A256GCM' })
      .setIssuedAt()
      .setIssuer('http://localhost:5001')
      .setAudience('http://localhost:5001')
      .setExpirationTime('30s')
      .encrypt(this.secret)
    return jwe;
  }

  async decrypt(jwe: jose.GeneralJWE) {
    if (!this.secret)
      throw new UnauthorizedException();

    const {
      plaintext,
      protectedHeader,
      additionalAuthenticatedData
    } = await jose.generalDecrypt(jwe, this.secret)
    console.log(plaintext, protectedHeader, additionalAuthenticatedData)
    return plaintext;
  }
}