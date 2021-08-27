import { BadRequestException, Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { OktaUser } from 'src/entities/okta-user.entity';
import { OktaService } from 'src/services/okta.service';
import { ProfileService } from 'src/profile/profile.service';
import { CreateRegistrationDto } from './dto/create-registration.dto';
import { EmailParam } from 'src/dto/email-param.dto';
import { UsernameParam } from 'src/dto/username-param.dto';

@ApiTags('registration')
@Controller('registration')
export class RegistrationController {
  constructor(
    private readonly oktaService: OktaService,
    private readonly profileService: ProfileService,
  ) { }

  @ApiResponse({ status: 201 })
  @ApiResponse({ status: 400 })
  @Post('user')
  async RegisterUser(@Body() createRegistrationDto: CreateRegistrationDto) {
    const { email, username } = createRegistrationDto;
    const oktaUser = await this.oktaService.User.findOne(email);
    if (oktaUser) {
      throw new BadRequestException('email already in use');
    }

    let profile = await this.profileService.findOneByUsername(username);
    if (profile) {
      throw new BadRequestException('username already in use');
    }

    const newOktaUser: OktaUser = {
      firstName: 'undefined',
      lastName: 'undefined',
      email: createRegistrationDto.email,
      login: createRegistrationDto.email
    }

    await this.oktaService.User.create(newOktaUser, createRegistrationDto.password);

    await this.profileService.create(createRegistrationDto);
  }

  @ApiOperation({ summary: 'validate username is available' })
  @ApiOkResponse({
    description: 'returns true if username is available',
    type: String,
  })
  @Get('validate/username/:username')
  async validateUserName(@Param() params: UsernameParam) {
    const { username } = params;
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
  @Get('validate/email/:email')
  async validateEmail(@Param() params: EmailParam) {
    const { email } = params;
    const oktaUser = await this.oktaService.User.findOne(email);
    if (oktaUser) {
      throw new BadRequestException(['email is already in use'])
    }
  }
}
