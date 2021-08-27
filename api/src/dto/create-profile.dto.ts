import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class CreateProfileDto {
  @IsNotEmpty()
  @ApiProperty({type: String})
  issuer: string;

  @IsNotEmpty()
  @ApiProperty({type: String})
  cid: string;

  @IsNotEmpty()
  @ApiProperty({type: String})
  username: string;

  @ApiProperty({type: String})
  summary: string;
}
