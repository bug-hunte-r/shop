import { IsInt, IsString } from "class-validator";
import mongoose from "mongoose";

export class CreateProductDto {

    @IsString()
    title: string;
    
    @IsInt()
    price: number;

    category: mongoose.Types.ObjectId;
}
