import { ApiProperty } from '@nestjs/swagger';
import { MaxLength } from 'class-validator';

export class PresignUrlCreateDto {
  @ApiProperty({ type: String })
  @MaxLength(255)
  postDescription: string;
}
