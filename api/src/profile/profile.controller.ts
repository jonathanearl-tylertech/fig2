import { Controller, Get, Body, Patch, Param, Delete, NotFoundException, NotImplementedException } from '@nestjs/common';
import { ProfileService } from 'src/services/profile/profile.service';
import { UpdateProfileRequest } from './dto/update-profile-request';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Profile } from '../services/profile/profile.model';
import { UserInfo } from 'src/decorators/user-info.decorator';

@ApiTags('profile')
@Controller('profile')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @ApiOperation({ summary: 'get own profile'})
  @ApiOkResponse({ description: 'the found profile', type: Profile })
  @Get('')
  async findMe(@UserInfo() user) {
    const { uid } = user;
    let profile = await this.profileService.findOneByUid(uid);
    if (!profile) {
      var currentDate = new Date();
      var ms = currentDate.getTime();
      profile = await this.profileService.create({ 
        username: `who_am_i_${ms}`, 
        modifiedAt: currentDate, 
        createdAt: currentDate
      })
    }
    return profile;
  }

  @ApiOperation({ summary: 'update profile by username' })
  @ApiOkResponse({ description: 'the updated profile', type: Profile })
  @Patch('')
  async update(@UserInfo() user, @Body() updateProfileDto: UpdateProfileRequest) {
    throw new NotImplementedException();
    const profile = await this.profileService.findOneByUid(user.uid);
    profile.summary = updateProfileDto.summary;
    const result = await this.profileService.update(profile);
    return result;
  }

  @ApiOperation({ summary: 'delete profile by username' })
  @ApiOkResponse({ description: 'the updated profile' })
  @Delete('')
  async remove() {
    throw new NotImplementedException();
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

}
