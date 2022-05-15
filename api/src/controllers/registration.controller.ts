import {
  BadRequestException,
  Body,
  ConflictException,
  Controller,
  Get,
  Param,
  Post,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiConflictResponse,
  ApiNoContentResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { EmailDto } from 'src/dtos/email.dto';
import { ProfileCreateDto } from 'src/dtos/profile-create.dto';
import { UsernameDto } from 'src/dtos/username.dto';
import { EmojiGeneratorService } from 'src/services/emoji-generator.service';
import { IdentityService } from 'src/services/identity.service';
import { UserService } from 'src/services/user.service';

@ApiTags('registration')
@Controller('registration')
export class RegistrationController {
  constructor(
    private idSvc: IdentityService,
    private userSvc: UserService,
    private emojiSvc: EmojiGeneratorService,
  ) {}

  @Post('')
  @ApiOperation({ summary: 'registers a new user' })
  @ApiNoContentResponse()
  @ApiBadRequestResponse()
  @ApiConflictResponse()
  async RegisterUser(@Body() dto: ProfileCreateDto) {
    const { credentials, username } = dto;
    const icon = this.emojiSvc.generate();
    const identityExists = await this.idSvc.findByEmail(credentials.email);
    if (identityExists)
      throw new ConflictException(`email: ${credentials.email} already in use.`);

    const userExists = await this.userSvc.findByUsername(username);
    if (userExists)
      throw new ConflictException(`username: ${username} already in use.`);

    const identity = await this.idSvc.create(credentials.email, credentials.password);
    const user = await this.userSvc.create(username, icon);
    await this.idSvc.update(identity.id, { user: user._id });
    await this.userSvc.update(user.id, { identity: identity._id });
  }

  @Get('user/:username')
  @ApiOperation({ summary: 'validate username is available' })
  @ApiOkResponse({
    type: Boolean,
    description: 'returns ok if username is valid and unused',
  })
  async validateUserName(@Param() dto: UsernameDto) {
    const { username } = dto;
    const existingUser = await this.userSvc.findByUsername(username);
    return existingUser == null;
  }

  @Get('identity/:email')
  @ApiOperation({ summary: 'validate email is available' })
  @ApiOkResponse({ type: Boolean, description: 'true if email is valid' })
  async validateEmail(@Param() dto: EmailDto) {
    const { email } = dto;
    const existingIdentity = await this.idSvc.findByEmail(email);
    return existingIdentity == null;
  }
}
