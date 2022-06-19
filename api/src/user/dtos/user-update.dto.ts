import { ApiProperty } from '@nestjs/swagger';
import { MaxLength, MinLength } from 'class-validator';

export class UserUpdateDto {
  @ApiProperty({ type: String })
  @MaxLength(1)
  icon: string;

  @ApiProperty({ type: String })
  @MaxLength(256)
  summary: string;

  @ApiProperty({ type: String })
  @MinLength(3)
  @MaxLength(24)
  username: string;
}