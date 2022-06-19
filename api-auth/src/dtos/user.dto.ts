import { ApiProperty } from '@nestjs/swagger';

export class UserDto {
  @ApiProperty({ type: String })
  email: string;

  @ApiProperty({ type: String })
  _id: string;

  @ApiProperty({ type: String })
  username: string;
}