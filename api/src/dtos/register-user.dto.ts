import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export class RegisterUserDto {
  @IsEmail()
  @IsNotEmpty()
  @ApiProperty({ type: String })
  email: string;

  @IsNotEmpty()
  @MinLength(16)
  @ApiProperty({ type: String })
  password: string;

  @IsNotEmpty()
  @MinLength(3)
  @ApiProperty({ type: String })
  username: string;
}
