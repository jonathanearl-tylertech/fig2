import {
  Body,
  Controller,
  Delete,
  NotFoundException,
  Post,
  Redirect,
  Req,
  Res,
  UnauthorizedException,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiConsumes,
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Request, Response } from 'express';
import { CredentialDto } from 'src/dtos/credential.dto';
import { IdentityService } from 'src/services/identity.service';

@ApiTags('session')
@Controller('session')
export class SessionController {
  private readonly SESSION_LENGTH = 1000 * 60 * 60 * 24 * 30;

  constructor(
    private readonly idSvc: IdentityService,
  ) { }

  @Post('')
  @ApiConsumes('multipart/form-data')
  @Redirect('/')
  @ApiBadRequestResponse({ description: 'invalid username or password' })
  async startSession(@Req() req: Request, @Res() res: Response, @Body() dto: CredentialDto) {
    const { email, password } = dto;
    const identity = await this.idSvc.findByCredential(email, password);
    if (!identity)
      throw new NotFoundException();

    res.cookie('uid', identity.user, {
      maxAge: this.SESSION_LENGTH,
      httpOnly: true,
      signed: true,
    });
  }

  @Delete('')
  @Redirect('/')
  async endSession(@Res() res: Response) {
    res.clearCookie('uid', { maxAge: -1 });
  }
}
