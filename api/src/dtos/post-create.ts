import { ApiProperty } from '@nestjs/swagger';
import { MaxLength } from 'class-validator';

export class PostCreate {
  @ApiProperty({ type: String })
  @MaxLength(255)
  description: string;
}
