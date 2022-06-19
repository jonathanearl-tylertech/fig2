import {
  BadRequestException,
  Controller,
  NotFoundException,
  Post,
  Req,
  UseFilters,
} from '@nestjs/common';
import {
  ApiConflictResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from '../../schemas/user.schema';
import { MongoExceptionFilter } from '../../filters/mongo-exception.filter';
import { PasswordService } from '../../services/password.service';
import * as jwt from 'jsonwebtoken';
import { Request } from 'express';

@ApiTags('token')
@Controller('oauth2/v1/token')
export class TokenController {
  private JWT_SIGNATURE_SECRET;

  constructor(
    @InjectModel(User.name) private readonly user: Model<UserDocument>,
    private readonly passwordService: PasswordService,
  ) {
    console.log(process.env.JWT_SIGNATURE_SECRET)
  }

  @Post()
  @ApiConflictResponse()
  @ApiOkResponse({ type: String })
  @UseFilters(MongoExceptionFilter)
  async create(@Req() req: Request) {
    const authorizationHeader = req.headers['authorization'];
    const [prefix, authToken] = authorizationHeader.split(' ');
    if (prefix.toLowerCase() !== 'bearer')
      throw new BadRequestException(`Invalid prefix: ${prefix}, expected bearer`);

    const token = jwt.decode(authToken, this.JWT_SIGNATURE_SECRET);

    const doc = await this.user.findOne({ id: token.sub }).lean();
    if (!doc)
      throw new NotFoundException();

    const idToken = { 
      sub: doc.id,
      email: doc.email,
      "iss": "", // in discovery doc
      "aud": "", // clientId
      "exp": Date.now() + 60 * 5, // expiration of token
      "iat": Date.now(),  //
      "auth_time": Date.now(), // should be last login
      "acr": "urn:mace:incommon:iap:silver" // ???
    };
    return jwt.sign(idToken, this.JWT_SIGNATURE_SECRET);
  }
}
