import { IsString, MaxLength, MinLength } from "class-validator";

export class LoginDto {
    @IsString()
    @MaxLength(15)
    @MinLength(3)
    username: string;

    @IsString()
    @MinLength(5)
    password: string;
}
