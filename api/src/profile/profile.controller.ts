import { Controller, Get, Body, Patch, Param, Delete, NotFoundException, NotImplementedException } from '@nestjs/common';
import { ProfileService } from 'src/profile/profile.service';
// import { UpdateProfileRequest } from './dto/update-profile-request';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
// import { Profile } from '../services/profile/profile.model';
// import { UserInfo } from 'src/decorators/user-info.decorator';

@ApiTags('profile')
@Controller('profile')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @ApiOperation({ summary: 'get own profile'})
  @ApiOkResponse({ description: 'the found profile', type: null })
  @Get('')
  async GetSelf() {
    throw new NotImplementedException();
  }

  @ApiOperation({ summary: 'update profile by username' })
  @ApiOkResponse({ description: 'the updated profile', type: null })
  @Patch('')
  async UpdateSelf() {
    throw new NotImplementedException();
  }

  @ApiOperation({ summary: 'delete profile by username' })
  @ApiOkResponse({ description: 'the updated profile' })
  @Delete('')
  async Disable() {
    throw new NotImplementedException();
  }

  @ApiOperation({ summary: 'find profile by username' })
  @ApiOkResponse({ description: 'the found profile', type: null })
  @Get(':username')
  async GetProfile(@Param('username') username: string) {
  }

}
