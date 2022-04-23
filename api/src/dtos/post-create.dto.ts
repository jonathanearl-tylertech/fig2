import { ApiProperty } from '@nestjs/swagger';
import { IsUrl } from 'class-validator';

export class PostCreateDto {
  @ApiProperty({ type: String })
  description: string;

  @ApiProperty({ type: String })
  @IsUrl()
  imgUrl: string;
}
