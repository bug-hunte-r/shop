import { IsString, MaxLength, MinLength } from "class-validator";
import mongoose from "mongoose";

export class CreateTicketDto {

    user: mongoose.Types.ObjectId;

    @IsString()
    @MaxLength(20)
    @MinLength(5)
    subject: String;
    
    @IsString()
    @MinLength(5)
    body: String;

    department: mongoose.Types.ObjectId;

    sender: String;

    hasAnswer: Boolean;

    isItAnswer: Boolean;

    mainTicket: mongoose.Types.ObjectId;
}
