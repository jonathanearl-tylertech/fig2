import {
  Body,
  Controller,
  NotFoundException,
  NotImplementedException,
  Post,
  Req,
  Res,
  UnauthorizedException,
  UseFilters,
} from '@nestjs/common';
import { ApiConflictResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from '../../schemas/user.schema';
import { MongoExceptionFilter } from '../../filters/mongo-exception.filter';
import * as jwt from 'jsonwebtoken';
import { Request, Response } from 'express';
import { TokenRequestDto } from 'src/dtos/token-request.dto';
import { UserSessionService } from 'src/services/user-session.service';
import { CodeSessionService } from 'src/services/code-session.service';

@ApiTags('token')
@Controller('oauth2/v1/token')
export class TokenController {
  private JWT_SIGNATURE_SECRET;

  constructor(
    private readonly codeSession: CodeSessionService,
    @InjectModel(User.name) private readonly user: Model<UserDocument>,
  ) {
    console.log(process.env.JWT_SIGNATURE_SECRET);
  }

  @Post()
  @ApiConflictResponse()
  @ApiOkResponse({ type: String })
  @UseFilters(MongoExceptionFilter)
  async create(@Body() body: TokenRequestDto, @Res() res: Response, @Req() req: Request) {
    const { client_id, client_secret, code, grant_type, scope } = body;
    // look up session by user by code
    if (client_id !== 'fig')
      throw new NotFoundException(
        `client_id 'fig' not registered with auth-server`,
      );

    if (client_secret !== 'secret')
      throw new UnauthorizedException(`invalid 'client_secret'`);

    if (grant_type !== 'authorization_code')
      throw new NotImplementedException(
        `grant_type must be 'authorization_code'`,
      );
    
    const session = this.codeSession.get(code);
    if(!session)
      throw new UnauthorizedException('code invalid')

    const doc = await this.user.findOne({ id: session.sid }).lean();
    if (!doc) throw new NotFoundException();

    const idToken = {
      sub: doc.id,
      email: doc.email,
      iss: 'auth-server',
      aud: 'fig',
      exp: Date.now() + 60 * 5,
      iat: Date.now(),
      auth_time: Date.now(),
    };
    return jwt.sign(idToken, this.JWT_SIGNATURE_SECRET);
  }
}
