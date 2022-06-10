import { ApiProperty } from '@nestjs/swagger';
import { IsMongoId } from 'class-validator';

export class IdentityFindOneDto {
  @ApiProperty({ type: String })
  @IsMongoId()
  id: string;
}
