import { ApiProperty } from '@nestjs/swagger';
import { IsUUID } from 'class-validator';

export class IdDto {
  @ApiProperty({ type: String })
  @IsUUID()
  id: string;
}
