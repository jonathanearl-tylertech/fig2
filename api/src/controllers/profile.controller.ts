import { Body, Controller, Get, Param, Post, UnauthorizedException, UseGuards } from '@nestjs/common';
import { UserService } from 'src/services/user/user.service';
import { IconUpdateDto } from 'src/dtos/icon-update.dto';
import { ProfileDto } from 'src/dtos/profile.dto';
import { SummaryUpdateDto } from 'src/dtos/summary-update.dto';
import { AuthGuard } from 'src/guards/auth.guard';
import { Uid } from 'src/decorators/uid.decorator';
import { ApiNoContentResponse, ApiOkResponse, ApiOperation } from '@nestjs/swagger';

@Controller('profile')
export class ProfileController {
    constructor(private readonly userSvc: UserService) { }

    @Get(':username')
    @ApiOperation({ summary: 'retrieve user profile' })
    @ApiOkResponse({ type: ProfileDto })
    async GetProfile(@Param('username') username: string) {
        const user = await this.userSvc.findByUsername(username);
        const response: ProfileDto = {
            icon: user.icon,
            id: user._id,
            username: user.username,
            summary: user.summary
        };
        return response;
    }

    @UseGuards(AuthGuard)
    @Post(':username/summary')
    @ApiOperation({ summary: 'update user summary' })
    @ApiNoContentResponse()
    async UpdateSummary(
        @Param('username') username: string,
        @Body() data: SummaryUpdateDto,
        @Uid() uid: string,
    ) {
        const user = await this.userSvc.findByUsername(username);
        if (uid != user._id)
            throw new UnauthorizedException()

        await this.userSvc.update(user._id, { summary: data.summary });
    }

    @UseGuards(AuthGuard)
    @Post(':username/icon')
    @ApiOperation({ summary: 'update users icon' })
    @ApiNoContentResponse()
    async UpdateIcon(
        @Param('username') username: string,
        @Body() data: IconUpdateDto,
        @Uid() uid: string,
    ) {
        const user = await this.userSvc.findByUsername(username);
        if (uid != user._id)
            throw new UnauthorizedException();

        await this.userSvc.update(user._id, { icon: data.icon });
    }
}
