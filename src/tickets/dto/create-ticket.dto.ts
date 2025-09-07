import { IsString, MinLength } from "class-validator";
import mongoose from "mongoose";

export class CreateTicketDto {

    user: mongoose.Types.ObjectId;

    @IsString()
    @MinLength(3)
    subject: String;
    
    @IsString()
    @MinLength(5)
    body: String;

    replyTo: mongoose.Types.ObjectId
}
