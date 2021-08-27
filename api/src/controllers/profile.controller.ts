import { Controller, Get, Body, Patch, Param, Delete, NotFoundException, Post, BadRequestException } from '@nestjs/common';
import { ProfileService } from 'src/services/profile.service';
import { UpdateProfileDto } from 'src/dto/update-profile.dto';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Profile } from 'src/entities/profile.entity';
import { CreateProfileDto } from 'src/dto/create-profile.dto';
import { UserInfo } from 'src/decorators/user-info.decorator';
import { Roles } from 'src/decorators/roles.decorator';
import { Role } from 'src/guards/role.enum';

@ApiTags('profile')
@Controller('profile')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @Roles(Role.User)
  @ApiOperation({ summary: 'get own profile'})
  @ApiOkResponse({ description: 'the found profile', type: Profile })
  @Get('me')
  async findMe(@UserInfo() user) {
    const { uid } = user;
    let profile = await this.profileService.findOneByUid(uid);
    if (!profile) {
      var currentDate = new Date();
      var ms = currentDate.getTime();
      profile = await this.profileService.create({ 
        issuers: { 
          default: uid
        }, 
        username: `who_am_i_${ms}`, 
        modifiedAt: currentDate, 
        createdAt: currentDate
      })
    }
    return profile;
  }

  @ApiOperation({ summary: 'update profile by username' })
  @ApiOkResponse({ description: 'the updated profile', type: Profile })
  @Patch('me')
  async update(@UserInfo() user, @Body() updateProfileDto: UpdateProfileDto) {
    const profile = await this.profileService.findOneByUid(user.uid);
    profile.summary = updateProfileDto.summary;
    const result = await this.profileService.update(profile);
    return result;
  }

  @ApiOperation({ summary: 'find all profiles' })
  @ApiOkResponse({ description: 'The found profiles', type: [Profile] })
  @Get()
  async findAll(): Promise<Profile[]> {
    var profiles = await this.profileService.findAll();
    return profiles;
  }

  @ApiOperation({ summary: 'find profile by username' })
  @ApiOkResponse({ description: 'the found profile', type: Profile })
  @Get(':username')
  async findOne(@Param('username') username: string) {
    const profile = await this.profileService.findOneByUsername(username);
    if (profile === undefined) {
      throw new NotFoundException();
    }
    return profile;
  }

  @ApiOperation({ summary: 'update profile by username' })
  @ApiOkResponse({ description: 'the updated profile', type: Profile })
  @Patch()
  async updateProfile(@Body() updateProfileDto: UpdateProfileDto) {
    let profile = await this.profileService.findOneById(updateProfileDto.id);
    profile = {...profile, ...updateProfileDto}
    return await this.profileService.update(profile);
  }

  @ApiOperation({ summary: 'delete profile by username' })
  @ApiOkResponse({ description: 'the updated profile' })
  @Delete(':username')
  async remove(@Param('username') username: string) {
    await this.profileService.remove(username)
    return;
  }

  @ApiOperation({ summary: 'add profile profile' })
  @ApiOkResponse({ description: 'the new profile', type: Profile })
  @Post()
  async create(@Body() newProfile: CreateProfileDto) {
    const { username } = newProfile;

    let profile = await this.profileService.findOneByUsername(username);
    if (profile) {
      throw new BadRequestException('username already taken');
    }

    profile = await this.profileService.create({...newProfile});
    return profile;
  }
}
