import { ApiProperty } from '@nestjs/swagger';
import { MaxLength, MinLength } from 'class-validator';
import { CredentialDto } from './credential.dto';

export class ProfileCreateDto {
  credentials: CredentialDto

  @ApiProperty({ type: String })
  @MinLength(3)
  @MaxLength(24)
  username: string;
}
