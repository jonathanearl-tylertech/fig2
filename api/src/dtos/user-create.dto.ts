import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, MaxLength, MinLength } from 'class-validator';

export class UserCreateDto {
  @ApiProperty({ type: String })
  @MinLength(3)
  @MaxLength(24)
  username: string;
}
