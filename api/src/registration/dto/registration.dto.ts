import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, MinLength } from "class-validator";

export class RegistrationDto {
    @IsEmail()
    @IsNotEmpty()
    @ApiProperty({type: String})
    email: string;
  
    @IsNotEmpty()
    @MinLength(3)
    @ApiProperty({type: String})
    username: string;
  
    @IsNotEmpty()
    @ApiProperty({type: String})
    password: string;
}