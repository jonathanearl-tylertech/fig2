import { ApiProperty } from '@nestjs/swagger';
import { MinLength } from 'class-validator';

export class UsernameDto {
  @ApiProperty({ type: String })
  @MinLength(3)
  username: string;
}
