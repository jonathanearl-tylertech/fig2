import { ApiProperty } from '@nestjs/swagger';
import {
  IsAlpha,
  IsOptional,
  IsUUID,
  MaxLength,
  MinLength,
} from 'class-validator';

export class SearchDto {
  @ApiProperty({ type: String })
  @IsUUID()
  @IsOptional()
  id?: string;

  @ApiProperty({ type: String })
  @IsAlpha()
  @MinLength(3)
  @MaxLength(24)
  @IsOptional()
  username?: string;
}
