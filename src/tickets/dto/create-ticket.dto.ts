import { IsBoolean, IsString, MinLength } from "class-validator";
import mongoose from "mongoose";

export class CreateTicketDto {

    user: mongoose.Types.ObjectId;

    @IsString()
    @MinLength(3)
    subject: String;

    @IsString()
    @MinLength(5)
    body: String;

    department: mongoose.Types.ObjectId;

    hasAnswer: Boolean
    
    isItAnswer: Boolean

    mainTicket: mongoose.Types.ObjectId
}
