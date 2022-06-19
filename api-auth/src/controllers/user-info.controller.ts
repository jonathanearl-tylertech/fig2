import {
  BadRequestException,
  Controller,
  Get,
  Req,
  UseFilters,
} from '@nestjs/common';
import {
  ApiOkResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from '../schemas/user.schema';
import { MongoExceptionFilter } from '../filters/mongo-exception.filter';
import * as jwt from 'jsonwebtoken';
import { Request } from 'express';

@ApiTags('userinfo')
@Controller('v1/userinfo')
export class UserInfoController {
  private JWT_SIGNATURE_SECRET;

  constructor(
    @InjectModel(User.name) private readonly identity: Model<UserDocument>,
  ) {
    this.JWT_SIGNATURE_SECRET = process.env.JWT_SIGNATURE_SECRET;
  }

  @Get()
  @ApiOkResponse({ type: String })
  @ApiUnauthorizedResponse()
  @UseFilters(MongoExceptionFilter)
  async create(@Req() req: Request) {
    const authorizationHeader = req.headers['authorization'];
    const [prefix, token] = authorizationHeader.split(' ');
    if (prefix.toLowerCase() !== 'bearer')
      throw new BadRequestException(`Invalid prefix: ${prefix}, expected bearer`);

    const identity = jwt.decode(token, this.JWT_SIGNATURE_SECRET);

    return { 
      sub: identity.id,
      email: identity.email,
    };
  }
}
