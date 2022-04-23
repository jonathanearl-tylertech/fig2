import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class StartSessionDto {
  @ApiProperty({ type: String })
  @IsNotEmpty()
  email: string;

  @ApiProperty({ type: String })
  @IsNotEmpty()
  password: string;
}
