import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, MinLength } from "class-validator";

export class ValidateUsernameDto {
    @IsNotEmpty()
    @MinLength(3)
    @ApiProperty({type: String})
    username: string;
}