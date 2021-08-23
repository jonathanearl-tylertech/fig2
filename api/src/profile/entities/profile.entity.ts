import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class Profile {
  @ApiProperty({type: String})
  _id: String;
  
  @ApiProperty({type: String})
  sub: String;

  @ApiProperty({type: String})
  email: String;

  @ApiProperty({type: String})
  name: String;

  @ApiProperty({type: String})
  username: String;

  @ApiProperty({type: String})
  summary: String;

  @ApiPropertyOptional({type: Date})
  createdAt?: Date;
  
  @ApiPropertyOptional({type: Date})
  modifiedAt?: Date;
}
