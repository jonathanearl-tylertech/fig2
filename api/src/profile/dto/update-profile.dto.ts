import { ApiProperty } from '@nestjs/swagger';

export class UpdateProfileDto {
  @ApiProperty({type: String})
  id: string;
  
  @ApiProperty({type: String})
  summary: string;
}
