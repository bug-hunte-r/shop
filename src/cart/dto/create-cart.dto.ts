import { IsInt, MinLength } from "class-validator";
import mongoose from "mongoose";

export class CreateCartDto {

    user: mongoose.Types.ObjectId;

    product: mongoose.Types.ObjectId;

    @IsInt()
    @MinLength(0)
    count: Number
}
