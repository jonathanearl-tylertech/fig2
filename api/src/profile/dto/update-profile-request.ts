import { ApiProperty } from '@nestjs/swagger';

export class UpdateProfileRequest {
  @ApiProperty({ type: String })
  id: string;

  @ApiProperty({ type: String })
  summary: string;
}
