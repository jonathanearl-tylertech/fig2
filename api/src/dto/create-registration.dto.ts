import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty } from "class-validator";

export class CreateRegistrationDto {
    @IsEmail()
    @IsNotEmpty()
    @ApiProperty({type: String})
    email: string;
  
    @IsNotEmpty()
    @ApiProperty({type: String})
    username: string;
  
    @IsNotEmpty()
    @ApiProperty({type: String})
    password: string;
}