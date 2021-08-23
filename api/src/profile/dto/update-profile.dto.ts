import { ApiProperty } from '@nestjs/swagger';

export class UpdateProfileDto {
  @ApiProperty({type: String})
  name: String;
  @ApiProperty({type: String})
  summary: String;
}
