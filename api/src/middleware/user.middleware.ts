import { BadRequestException, Injectable, NestMiddleware } from '@nestjs/common';
import { OktaService } from 'src/services/okta.service';

@Injectable()
export class UserMiddleware implements NestMiddleware {

  constructor(private readonly oktaService: OktaService) {}

  async use(req: any, res: any, next: () => void) {
    const authHeader: string = req.headers.authorization as string;
    const claims = await this.extractUserClaims(authHeader);
    if (claims) {
      req.user = { ...claims };
    }
    next();
  }

  async extractUserClaims(authHeader: string) {
    try {
      if (!authHeader) {
        return undefined;
      }
  
      const tokenType = authHeader.split(' ')[0];
      const token = authHeader.split(' ')[1];
  
      if (tokenType.toLowerCase() !== 'bearer') {
        throw new BadRequestException({ message: 'unrecoginized authorization header expecting: "bearer {token}"'});
      }
      
      const userClaims = await this.oktaService.User.verifyToken(token);
      return userClaims;
    } catch(err) {
      console.error('unable to validate access_token', err);
      return undefined;
    }
  }
}
