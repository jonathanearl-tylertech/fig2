import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty } from "class-validator";

export class CreateProfileDto {
  @IsNotEmpty()
  @ApiProperty({type: String})
  sub: string;

  @IsNotEmpty()
  @ApiProperty({type: String})
  username: string;
}
