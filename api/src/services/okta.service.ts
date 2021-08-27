import { BadRequestException, Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import okta from '@okta/okta-sdk-nodejs';
import dotenv from 'dotenv';
import { OktaUser } from '../entities/okta-user.entity';
import { createRemoteJWKSet } from 'jose/jwks/remote'
import { jwtVerify } from 'jose/jwt/verify'

dotenv.config();

const { OKTA_ORG_URL, OKTA_API_KEY } = process.env;

@Injectable()
export class OktaService {
  private client: okta.Client;
  private passwordError: string;
  private baseUrl: string;
  private JWKS: any;

  constructor() {
    this.client = new okta.Client({
      orgUrl: OKTA_ORG_URL,
      token: OKTA_API_KEY
    });
    this.passwordError = 'Okta HTTP 400 E0000001 Api validation failed: password. password: ';
    this.baseUrl = OKTA_ORG_URL;
    this.JWKS = createRemoteJWKSet(new URL(`${this.baseUrl}oauth2/default/v1/keys`), {});
  }


  User = {
    findOne: async (loginOrId: string) => {
      try {
        const user = await this.client.getUser(loginOrId);
        return user;
      } catch (err) {
        if (err.status === 404) {
          return null;
        }
        console.error(err);
        throw err;
      }
    },

    create: async (user: OktaUser, password: string) => {
      try {
        const newUser = {
          profile: user,
          credentials: {
            password: {
              value: password
            }
          }
        };
        await this.client.createUser(newUser);
      } catch (err) {
        if (err.status === 400) {
          if (err.message.startsWith(this.passwordError)) {
            throw new BadRequestException(err.message.substring(this.passwordError.length));
          }
          throw new BadRequestException(err.message);
        }
        console.error('could not create okta user', err);
        throw new InternalServerErrorException();
      }
    },

    verifyToken: async (accessToken: string) => {
      console.log(accessToken)
      try {
        const { payload, protectedHeader } = await jwtVerify(accessToken, this.JWKS, {
          issuer: 'https://dev-840204.okta.com/oauth2/default',
          audience: 'api://default'
        })
        console.log('protected header', protectedHeader)
        console.log('payload', payload)
        return payload;
      } catch (err) {
        console.log('unable to authroize user', err)
        throw new UnauthorizedException(err.message)
      }
    }
  }
}
