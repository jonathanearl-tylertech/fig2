import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class UsernameParam {
    @IsNotEmpty()
    @ApiProperty({type: String})
    username: string;
}