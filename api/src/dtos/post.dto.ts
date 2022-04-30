import { ApiProperty } from '@nestjs/swagger';

export class PostDto {
  @ApiProperty({ type: String })
  Id: string;

  @ApiProperty({ type: String })
  description: string;

  @ApiProperty({ type: String })
  imgUrl: string;
}
