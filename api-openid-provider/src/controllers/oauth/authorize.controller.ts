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
import { CodeSessionService } from 'src/services/code-session.service';
import { UserSessionService } from 'src/services/user-session.service';

@ApiTags('oauth')
@Controller('oauth2/v1/authorize')
export class AuthorizeController {
  clients = {
    fig: {
      allowedRedirects: ['*'],
    },
  };

  constructor(
    private readonly codeSession: CodeSessionService,
    private readonly userSession: UserSessionService,
  ) { }

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
    let userSession = this.userSession.get(sid);
    if (userSession) {
      const code = this.codeSession.set({ uid: userSession.uid })
      return res.redirect(`${redirect_uri}$code=${code}`);
    }

    if (!scope.includes('openid'))
      throw new BadRequestException(`scope must include 'openid'`);

    if (response_type.toLowerCase().trim() !== 'code')
      throw new NotImplementedException(`only 'code' is supported`);

    const client = this.clients[client_id];
    if (!client)
      throw new UnauthorizedException(`client_id not registered ${client_id}`);

    if (!client.allowedRedirects.includes('*') && !client.allowedRedirects.includes(redirect_uri))
      throw new UnauthorizedException(`redirect_uri not registed for ${client_id}`);

    sid = this.userSession.set(body as UserSession);
    const code = this.codeSession.set({ uid: userSession.uid })
    return res.cookie('sid', sid, { httpOnly: true })
      .redirect(`${redirect_uri}$code=${userSession.code}`);
  }
}
