import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class CreateCommentDto {
  @IsNotEmpty()
  @ApiProperty({type: String})
  message: string;
}
