import { IsInt, IsString, MaxLength, MinLength } from "class-validator";
import mongoose from "mongoose";

export class SignupDto {

    id: mongoose.Types.ObjectId;

    @IsString()
    @MaxLength(15)
    @MinLength(3)
    username: string;

    @IsInt()
    mobile: number;

    @IsString()
    @MinLength(5)
    password: string;

    role: string
}
