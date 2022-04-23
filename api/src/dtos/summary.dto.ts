import { ApiProperty } from "@nestjs/swagger";
import { MaxLength } from "class-validator";

export class SummaryDto {
  @ApiProperty({ type: String })
  @MaxLength(200)
  summary: string;
}