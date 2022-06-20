import { Injectable } from '@nestjs/common';
import * as jose from 'jose';
import { Uuid } from "src/services/uuid.service";

@Injectable()
export class JWTSignatureService {
  private privateKeys: any[] = [];
  private publicKeys: any[] = [];
  private alg = 'RS256';
  private use = 'sig';

  constructor(private readonly uuid: Uuid) { }

  async getKeys() {
    while(this.publicKeys.length < 2)
      await this.rotateKeys();

    return this.publicKeys;
  }

  async signJWT(obj: any) {
    while(this.publicKeys.length < 2)
      await this.rotateKeys();

    let key = this.privateKeys[0];
    key = this.privateKeys[0];
    const jwt = await new jose.SignJWT(obj)
      .setAudience('fig')
      .setExpirationTime('5m')
      .setIssuedAt()
      .setIssuer('openid-provider')
      .setProtectedHeader({ alg: this.alg })
      .sign(key);
    return jwt;
  }

  private async rotateKeys() {
    const { publicKey, privateKey } = await jose.generateKeyPair(this.alg);
    const newKey = await jose.exportJWK(publicKey);
    const kid = this.uuid.generate();
    this.publicKeys = [
      { ...newKey, kid, use: this.use, alg: this.alg },
      ...this.publicKeys,
    ];

    this.privateKeys = [
      { key: privateKey, kid, use: this.use, alg: this.alg },
      ...this.privateKeys
    ];

    if (this.publicKeys.length > 2) this.publicKeys.pop();
    if (this.privateKeys.length > 2) this.publicKeys.pop();
  }
}