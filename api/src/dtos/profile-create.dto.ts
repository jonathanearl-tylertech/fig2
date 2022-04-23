import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, MaxLength, MinLength } from 'class-validator';

export class ProfileCreateDto {
  @ApiProperty({ type: String })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({ type: String })
  @MinLength(12)
  @MaxLength(256)
  password: string;

  @ApiProperty({ type: String })
  @MinLength(3)
  @MaxLength(24)
  username: string;
}
