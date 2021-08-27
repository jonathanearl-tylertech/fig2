import { ApiProperty } from "@nestjs/swagger";

export class ProfileDto {
  @ApiProperty({type: String})
  id: string;

  @ApiProperty({type: String})
  username: string;

  @ApiProperty({type: String})
  summary: string;
}
