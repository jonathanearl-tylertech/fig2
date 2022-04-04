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
import { RegistrationService } from './registration.service';

@ApiTags('registration')
@Controller('registration')
export class RegistrationController {
  constructor(
    private readonly registrationSvc: RegistrationService
  ) {}

  @ApiOperation({ summary: 'registers a new user' })
  @ApiNoContentResponse()
  @ApiBadRequestResponse()
  @Post('')
  async RegisterUser(@Body() dto: RegisterUserDto) {
    const { email, password, username } = dto;
    if (await this.registrationSvc.isEmailInUse(email))
      throw new BadRequestException(`email '${email}' already taken`);

    if (await this.registrationSvc.isUsernameInUse(username))
      throw new BadRequestException(`username '${username}' already taken`);

    await this.registrationSvc.registerUser(email, password, username);
  }

  @ApiOperation({ summary: 'validate username is available' })
  @ApiOkResponse({
    type: Boolean,
    description: 'returns ok if username is valid and unused',
  })
  @Get('validateUsername/:username')
  async validateUserName(@Param() dto: ValidateUsernameDto) {
    return await this.registrationSvc.isUsernameInUse(dto.username);
  }

  @ApiOperation({ summary: 'validate email is available' })
  @ApiOkResponse({ type: Boolean, description: 'true if email is valid' })
  @Get('validateEmail/:email')
  async validateEmail(@Param() dto: ValidateEmailDto) {
    return await this.registrationSvc.isEmailInUse(dto.email);
  }
}
