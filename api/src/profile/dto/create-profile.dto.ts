import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class Issuers {
  @ApiProperty({type: String })
  default: string
}

export class CreateProfileDto {
  @IsNotEmpty()
  @ApiProperty({type: Issuers})
  issuers: Issuers;

  @IsNotEmpty()
  @ApiProperty({type: String})
  cid: string;

  @IsNotEmpty()
  @ApiProperty({type: String})
  username: string;

  @ApiProperty({type: String})
  summary: string;
}
