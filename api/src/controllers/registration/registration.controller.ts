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
import { RegisterUserDto } from 'src/controllers/registration/dto/register-user.dto';
import { ValidateEmailDto } from 'src/controllers/registration/dto/validate-email.dto';
import { ValidateUsernameDto } from 'src/controllers/registration/dto/validate-username.dto';
import { IdentityService } from 'src/services/identity/identity.service';
import { UserService } from 'src/services/user/user.service';

@ApiTags('registration')
@Controller('registration')
export class RegistrationController {
  constructor(
    private idSvc: IdentityService,
    private userSvc: UserService,
  ) {}

  @ApiOperation({ summary: 'registers a new user' })
  @ApiNoContentResponse()
  @ApiBadRequestResponse()
  @Post('')
  async RegisterUser(@Body() dto: RegisterUserDto) {
    const { email, password, username } = dto;

    const existingIdentity = this.idSvc.findByEmail(email);
    if (existingIdentity)
      throw new BadRequestException(`email '${email}' already taken`);

    const existingUser = await this.userSvc.findByUsername(username);
    if (existingUser)
      throw new BadRequestException(`username '${username}' already taken`);

    const identity = await this.idSvc.create(email, password);
    const user = await this.userSvc.create(username);
    await this.idSvc.update(identity.id, { userId: user._id });
  }

  @ApiOperation({ summary: 'validate username is available' })
  @ApiOkResponse({
    type: Boolean,
    description: 'returns ok if username is valid and unused',
  })
  @Get('user/:username')
  async validateUserName(@Param() dto: ValidateUsernameDto) {
    const { username } = dto;
    const existingUser = await this.userSvc.findByUsername(username);
    return existingUser == null;
  }

  @ApiOperation({ summary: 'validate email is available' })
  @ApiOkResponse({ type: Boolean, description: 'true if email is valid' })
  @Get('identity/:email')
  async validateEmail(@Param() dto: ValidateEmailDto) {
    const { email } = dto;
    const existingIdentity = await this.idSvc.findByEmail(email);
    return existingIdentity == null;
  }
}
