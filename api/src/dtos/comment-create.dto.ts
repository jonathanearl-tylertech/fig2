import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CommentCreateDto {
  @ApiProperty({ type: String })
  @IsNotEmpty()
  message: string;
}
