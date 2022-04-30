import {
  Body,
  Controller,
  Delete,
  NotFoundException,
  Post,
  Req,
  Res,
  UnauthorizedException,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Request, Response } from 'express';
import { IdentityService } from 'src/services/identity.service';
import { PasswordService } from 'src/services/password.service';
import { CredentialDto } from 'src/dtos/credential.dto';

@ApiTags('session')
@Controller('session')
export class SessionController {
  private readonly SESSION_LENGTH = 1000 * 60 * 60 * 24 * 30;

  constructor(
    private readonly idSvc: IdentityService,
    private readonly pwSvc: PasswordService,
  ) { }

  @Post('')
  @ApiCreatedResponse({ description: 'session created' })
  @ApiBadRequestResponse({ description: 'invalid username or password' })
  async startSession(@Res() res: Response, @Body() dto: CredentialDto) {
    const { email, password } = dto;
    const identity = await this.idSvc.findByCredential(email, password);
    if (!identity)
      throw new UnauthorizedException();

    res.cookie('uid', identity.user, {
      maxAge: this.SESSION_LENGTH,
      httpOnly: true,
      signed: true,
    });
    res.sendStatus(201);
  }

  @Delete('')
  @ApiNoContentResponse({ description: 'session deleted' })
  @ApiNotFoundResponse({ description: 'no session found' })
  async endSession(@Req() req: Request, @Res() res: Response) {
    const { uid } = req.signedCookies;
    if (!uid) throw new NotFoundException('no session found');
    res.clearCookie('uid', { maxAge: -1 });
    res.sendStatus(204);
  }
}