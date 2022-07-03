import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, MaxLength, MinLength } from 'class-validator';

export class UserCreateDto {
  @ApiProperty({ type: String })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({ required: true, type: String })
  sub: string;

  @ApiProperty({ required: true, type: String, minLength: 3, maxLength: 24 })
  @MinLength(3)
  @MaxLength(24)
  username: string;
}
