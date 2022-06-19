import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsUUID } from "class-validator";

export class IdentityImport {
  @ApiProperty({ type: String })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({ type: String })
  @IsUUID()
  @IsNotEmpty()
  id: string;

  @ApiProperty({ type: String })
  @IsNotEmpty()
  password: string;
}