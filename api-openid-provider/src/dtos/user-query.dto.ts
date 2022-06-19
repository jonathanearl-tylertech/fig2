import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsOptional } from 'class-validator';

export class UserQueryDto {
  @ApiProperty({ type: String })
  @IsEmail()
  @IsOptional()
  email?: string;
}
