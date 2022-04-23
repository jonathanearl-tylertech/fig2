import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Param,
  Post,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiNoContentResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { RegisterUserDto } from 'src/dtos/register-user.dto';
import { ValidateEmailDto } from 'src/dtos/validate-email.dto';
import { ValidateUsernameDto } from 'src/dtos/validate-username.dto';
import { IdentityService } from 'src/services/identity/identity.service';
import { UserService } from 'src/services/user/user.service';

@ApiTags('registration')
@Controller('registration')
export class RegistrationController {
  constructor(
    private idSvc: IdentityService,
    private userSvc: UserService,
  ) {}

  @Post('')
  @ApiOperation({ summary: 'registers a new user' })
  @ApiNoContentResponse()
  @ApiBadRequestResponse()
  async RegisterUser(@Body() dto: RegisterUserDto) {
    const { email, password, username } = dto;

    const existingIdentity = await this.idSvc.findByEmail(email);
    if (existingIdentity)
      throw new BadRequestException(`email '${email}' already taken`);

    const existingUser = await this.userSvc.findByUsername(username);
    if (existingUser)
      throw new BadRequestException(`username '${username}' already taken`);

    const identity = await this.idSvc.create(email, password);
    const user = await this.userSvc.create(username);
    await this.idSvc.update(identity.id, { userId: user._id });
  }

  @Get('user/:username')
  @ApiOperation({ summary: 'validate username is available' })
  @ApiOkResponse({
    type: Boolean,
    description: 'returns ok if username is valid and unused',
  })
  async validateUserName(@Param() dto: ValidateUsernameDto) {
    const { username } = dto;
    const existingUser = await this.userSvc.findByUsername(username);
    return existingUser == null;
  }

  @Get('identity/:email')
  @ApiOperation({ summary: 'validate email is available' })
  @ApiOkResponse({ type: Boolean, description: 'true if email is valid' })
  async validateEmail(@Param() dto: ValidateEmailDto) {
    const { email } = dto;
    const existingIdentity = await this.idSvc.findByEmail(email);
    return existingIdentity == null;
  }
}
