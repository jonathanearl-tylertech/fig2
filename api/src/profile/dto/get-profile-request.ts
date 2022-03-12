import { ApiProperty } from "@nestjs/swagger";

export class GetProfileRequest {
  @ApiProperty({ type: String })
  username: string;
}
