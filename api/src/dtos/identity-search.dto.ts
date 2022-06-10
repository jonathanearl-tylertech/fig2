import { ApiProperty } from '@nestjs/swagger';
import { Identity } from 'src/schemas/identity.schema';

export class IdentitySearchResultDto {
  @ApiProperty({ type: Number })
  count: Number;

  @ApiProperty({ type: Identity })
  result: Array<Identity>;
}
