import {
  BadRequestException,
  Body,
  Controller,
  Get,
  NotImplementedException,
  Post,
  Query,
  Req,
  Res,
  UnauthorizedException,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Request, Response } from 'express';
import { AuthorizeRequestDto as AuthorizeRequestDto } from 'src/dtos/authorize-request.dto';
import { UserSession } from 'src/interfaces/UserSession';
import { UserSessionService } from 'src/services/user-session.service';
import { v4 as uuidv4 } from 'uuid';

@ApiTags('authorize')
@Controller('oauth2/v1/authorize')
export class AuthorizeController {
  clients = {
    fig: {
      allowedRedirects: ['*'],
    },
  };

  constructor(private readonly userSession: UserSessionService) {}

  @Get()
  get(@Query() query: AuthorizeRequestDto) {
    const { response_type, scope, client_id, state, redirect_uri, nonce } =
      query;
    if (!scope.includes('openid'))
      throw new BadRequestException(`scope must include 'openid'`);

    return query;
  }

  @Post()
  post(
    @Body() body: AuthorizeRequestDto,
    @Res() res: Response,
    @Req() req: Request,
  ) {
    const { response_type, scope, client_id, state, redirect_uri, nonce } = body;
    let sid = req.cookies['sid'];
    let session = this.userSession.get(sid);
    if (session) {
      return res.redirect(`${redirect_uri}$code=${session.code}`);
    }

    if (!scope.includes('openid'))
      throw new BadRequestException(`scope must include 'openid'`);

    if (response_type.toLowerCase().trim() !== 'code')
      throw new NotImplementedException(`only 'code' is supported`);

    const client = this.clients[client_id];
    if (!client)
      throw new UnauthorizedException(`client_id not registered ${client_id}`);

    if (
      !client.allowedRedirects.includes('*') &&
      !client.allowedRedirects.includes(redirect_uri)
    )
      throw new UnauthorizedException(
        `redirect_uri not registed for ${client_id}`,
      );

    sid = uuidv4();
    this.userSession.set(sid, body as UserSession);
    res.cookie('sid', sid, { httpOnly: true });
    res.redirect(`login`);
  }
}
