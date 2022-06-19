import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsUUID, MaxLength, MinLength } from 'class-validator';

export class UserCreateDto {
  @ApiProperty({ required: true, type: String })
  @IsUUID()
  identityId: string;

  @ApiProperty({ required: true, type: String, minLength: 3, maxLength: 24 })
  @MinLength(3)
  @MaxLength(24)
  username: string;
}
