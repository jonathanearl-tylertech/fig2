import { ApiProperty } from '@nestjs/swagger';

export class PresignUrlDto {
  @ApiProperty({ type: String })
  imageUploadUrl: string;
}
