import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class TokenRequestDto {
  @ApiProperty({ type: String })
  @IsNotEmpty()
  client_id: string;

  @ApiProperty({ type: String })
  @IsNotEmpty()
  client_secret: string;

  @ApiProperty({ type: String })
  @IsNotEmpty()
  code: string;

  @ApiProperty({ type: String })
  @IsNotEmpty()
  grant_type: string;

  @ApiProperty({ type: String, isArray: true })
  @IsNotEmpty()
  scope: string;
}
