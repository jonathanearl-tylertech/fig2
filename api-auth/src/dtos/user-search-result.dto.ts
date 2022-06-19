import { ApiProperty } from '@nestjs/swagger';
import { User } from '../schemas/user.schema';
import { UserDto } from './user.dto';

export class UserSearchResultDto {
  @ApiProperty({ type: Number })
  count: number;

  @ApiProperty({ type: UserDto })
  result: Array<UserDto>;
}
