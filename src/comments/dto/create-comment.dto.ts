import { IsString, MinLength } from "class-validator";
import mongoose from "mongoose";

export class CreateCommentDto {

    @IsString()
    @MinLength(5)
    body: string;

    user: mongoose.Types.ObjectId;

    product: mongoose.Types.ObjectId;
}
