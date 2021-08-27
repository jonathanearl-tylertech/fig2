import { ApiProperty } from "@nestjs/swagger";

export class CreatePostDto {
  @ApiProperty({type: String})
  username: string;
  
  @ApiProperty({type: String})
  description: string;
  
  @ApiProperty({type: String})
  imgUrl: string;
}
