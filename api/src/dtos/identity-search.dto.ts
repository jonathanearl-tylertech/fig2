import { ApiProperty } from '@nestjs/swagger';
import { Identity } from 'src/schemas/identity.schema';

export class IdentitySearchResultDto {
  @ApiProperty({ type: Number })
  count: number;

  @ApiProperty({ type: Identity })
  result: Array<Identity>;
}
