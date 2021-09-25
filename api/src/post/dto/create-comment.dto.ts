import { ApiProperty } from "@nestjs/swagger";

export class CreateCommentDto {
  @ApiProperty({type: String})
  message: string;
}
