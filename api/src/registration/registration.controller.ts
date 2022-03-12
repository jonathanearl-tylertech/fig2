import { BadRequestException, Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiBadRequestResponse, ApiOkResponse, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthService } from 'src/services/auth/auth.service';
import { ProfileService } from 'src/services/profile/profile.service';
import { RegistrationDto } from './requests/registration.dto';
import { ValidateEmailDto } from 'src/registration/requests/validate-email.dto';
import { ValidateUsernameDto } from 'src/registration/requests/validate-username.dto';

@ApiTags('registration')
@Controller('registration')
export class RegistrationController {
  constructor(
    private readonly profileService: ProfileService,
    private readonly authService: AuthService,
  ) { }

  @ApiOperation({ summary: 'registers a new user' })
  @ApiResponse({ status: 201 })
  @ApiBadRequestResponse()
  @Post('')
  async RegisterUser(@Body() dto: RegistrationDto) {
    const { username, password, email } = dto;
    this.authService.register(username, password, email);
  }

  @ApiOperation({ summary: 'validate username is available' })
  @ApiOkResponse({ description: 'returns ok if username is valid and unused' })
  @ApiBadRequestResponse({ type: [String], description: 'returns list of issues with the username' })
  @Get('validateUsername/:username')
  async validateUserName(@Param() dto: ValidateUsernameDto) {
    const { username } = dto;
    let profile = await this.profileService.findOneByUsername(username);
    if (profile) {
      throw new BadRequestException(['username is already in use'])
    }
  }

  @ApiOperation({ summary: 'validate email is available' })
  @ApiOkResponse({
    description: 'returns error message',
    type: String, 
  })
  @Get('validateEmail/:email')
  async validateEmail(@Param() dto: ValidateEmailDto) {
  }
}
