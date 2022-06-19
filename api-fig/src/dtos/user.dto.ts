import { ApiProperty } from "@nestjs/swagger";

export class UserDto {
  @ApiProperty({ type: Date })
  createdAt: Date;

  @ApiProperty({ type: String })
  email: string;

  @ApiProperty({ type: String })
  id: string;

  @ApiProperty({ type: String })
  icon: string;

  @ApiProperty({ type: Date })
  modifedAt: Date;

  @ApiProperty({ type: String })
  summary: string;

  @ApiProperty({ type: String })
  username: string;
}