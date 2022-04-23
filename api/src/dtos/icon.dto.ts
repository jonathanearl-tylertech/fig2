import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class IconDto {
  @ApiProperty({ type: String })
  @IsNotEmpty()
  icon: string;
}