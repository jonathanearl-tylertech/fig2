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
import { UserService } from 'src/user/user.service';
import { LoginDto } from './dtos/login.dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  private readonly THIRTY_DAYS: number;

  constructor(private readonly userSvc: UserService) {
    this.THIRTY_DAYS = 1000 * 60 * 60 * 24 * 30;
  }

  @ApiCreatedResponse({ description: 'session created' })
  @ApiBadRequestResponse({ description: 'invalid username or password' })
  @Post('session')
  async startSession(@Res() res: Response, @Body() dto: LoginDto) {
    const { username, password } = dto;
    const isAuthorized = await this.userSvc.validatePassword(
      username,
      password,
    );
    if (!isAuthorized)
      throw new UnauthorizedException('username or password is invalid');
    res.cookie('uid', username, {
      maxAge: this.THIRTY_DAYS,
      httpOnly: true,
      signed: true,
    });
    res.sendStatus(201);
  }

  @ApiNoContentResponse({ description: 'session deleted' })
  @ApiNotFoundResponse({ description: 'no session found' })
  @Delete('session')
  async endSession(@Req() req: Request, @Res() res: Response) {
    const { uid } = req.signedCookies;
    if (!uid) throw new NotFoundException('no session found');
    res.clearCookie('uid', { maxAge: -1 });
    res.sendStatus(204);
  }
}
