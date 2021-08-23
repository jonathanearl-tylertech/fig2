import { Controller, Get, Body, Patch, Param, Delete, NotFoundException, Post, BadRequestException } from '@nestjs/common';
import { ProfileService } from './services/profile/profile.service';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Profile } from './entities/profile.entity';
import { CreateProfileDto } from './dto/create-profile.dto';
import { OktaService } from 'src/okta/services/okta.service';
import { OktaUser } from 'src/okta/entities/okta-user.entity';

@ApiTags('profile')
@Controller('profile')
export class ProfileController {
  constructor(
    private readonly profileService: ProfileService,
    private readonly oktaService: OktaService,
  ) {}

  @ApiOperation({ summary: 'find all profiles' })
  @ApiOkResponse({
    description: 'The found profiles',
    type: [Profile],
  })
  @Get()
  async findAll(): Promise<Profile[]> {
    var profiles = await this.profileService.findAll();
    return profiles;
  }

  @ApiOperation({ summary: 'find profile by username' })
  @ApiOkResponse({
    description: 'the found profile',
    type: Profile,
  })
  @Get(':username')
  async findOne(@Param('username') username: string) {
    const profile = await this.profileService.findOne(username);
    if (profile === undefined) {
      throw new NotFoundException();
    }
    return profile;
  }

  @ApiOperation({ summary: 'update profile by username' })
  @ApiOkResponse({
    description: 'the updated profile',
    type: Profile,
  })
  @Patch(':username')
  update(@Param('username') username: string, @Body() updateProfileDto: UpdateProfileDto) {
    return this.profileService.update(username, updateProfileDto);
  }

  @ApiOperation({ summary: 'delete profile by username' })
  @ApiOkResponse({
    description: 'the updated profile',
  })
  @Delete(':username')
  async remove(@Param('username') username: string) {
    await this.profileService.remove(username)
    return;
  }

  @ApiOperation({ summary: 'register new profile' })
  @ApiOkResponse({
    description: 'the new profile',
    type: Profile,
  })
  @Post()
  async create(@Body() createProfileDto: CreateProfileDto) {
    const { username } = createProfileDto;

    let profile = await this.profileService.findOne(username);
    if (profile) {
      throw new BadRequestException('username already taken');
    }

    profile = await this.profileService.create(createProfileDto);
    return profile;
  }
}
