import { ApiProperty } from '@nestjs/swagger';
import { IsMongoId } from 'class-validator';

export class IdentityDeleteDto {
  @ApiProperty({ type: String })
  @IsMongoId()
  id: string;
}
