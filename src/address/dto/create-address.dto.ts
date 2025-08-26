import { IsString, MinLength } from "class-validator"
import mongoose from "mongoose"

export class CreateAddressDto {

    @IsString()
    @MinLength(3)
    province: string
    
    @IsString()
    @MinLength(3)
    city: string
    
    @IsString()
    @MinLength(3)
    neighborhood: string
    
    @IsString()
    @MinLength(3)
    street: string

    user: mongoose.Types.ObjectId
}
