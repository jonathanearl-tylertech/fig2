import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsOptional } from 'class-validator';

export class IdentitySearchRequestDto {
  @ApiProperty({ type: String })
  @IsEmail()
  @IsOptional()
  email?: string;
}
