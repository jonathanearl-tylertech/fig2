import { Body, Controller, Get, Param, Post, UnauthorizedException } from '@nestjs/common';
import { ApiNoContentResponse, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { UserService } from 'src/services/user.service';
import { IconDto } from 'src/dtos/icon.dto';
import { ProfileDto } from 'src/dtos/profile.dto';
import { SummaryDto } from 'src/dtos/summary.dto';
import { Uid } from 'src/decorators/uid.decorator';

@ApiTags('profile')
@Controller('profile')
export class ProfileController {
  constructor(private readonly userSvc: UserService) { }

  @Get(':uid')
  @ApiOperation({ summary: 'retrieve user profile' })
  @ApiOkResponse({ type: ProfileDto })
  async GetProfileByUsername(@Param('uid') uid: string) {
    const user = await this.userSvc.findById(uid);
    const response: ProfileDto = {
      icon: user.icon,
      id: user._id,
      username: user.username,
      summary: user.summary
    };
    return response;
  }

  @Post(':username/summary')
  @ApiOperation({ summary: 'update user summary' })
  @ApiNoContentResponse()
  async UpdateSummary(
    @Param('username') username: string,
    @Body() data: SummaryDto,
    @Uid() uid: string,
  ) {
    const user = await this.userSvc.findByUsername(username);
    if (uid != user._id)
      throw new UnauthorizedException()

    await this.userSvc.update(user._id, { summary: data.summary });
  }

  @Post(':username/icon')
  @ApiOperation({ summary: 'update users icon' })
  @ApiNoContentResponse()
  async UpdateIcon(
    @Param('username') username: string,
    @Body() data: IconDto,
    @Uid() uid: string,
  ) {
    const user = await this.userSvc.findByUsername(username);
    if (uid != user._id)
      throw new UnauthorizedException();

    await this.userSvc.update(user._id, { icon: data.icon });
  }
}
