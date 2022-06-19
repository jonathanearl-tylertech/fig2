import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsUrl } from 'class-validator';

export class AuthorizeRequestDto {
  @ApiProperty({ type: String })
  @IsNotEmpty()
  client_id: string;

  @ApiProperty({ type: String })
  nonce: string;

  @ApiProperty({ type: String })
  @IsNotEmpty()
  @IsUrl()
  redirect_uri: string;

  @ApiProperty({ type: String })
  @IsNotEmpty()
  response_type: string;

  @ApiProperty({ type: String, isArray: true })
  @IsNotEmpty()
  scope: string[];

  @ApiProperty({ type: String })
  state: string;
}
