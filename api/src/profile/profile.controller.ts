import {
  Controller,
  Get,
  Patch,
  Delete,
  NotImplementedException,
} from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('profile')
@Controller('profile')
export class ProfileController {
  @ApiOperation({ summary: 'get own profile' })
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
  async GetProfile() {
    throw new NotImplementedException();
  }
}
