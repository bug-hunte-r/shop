import { IsBoolean, IsString, MinLength } from "class-validator";
import mongoose from "mongoose";
import { TicketStatus } from "src/enum/ticketEnum";

export class CreateTicketDto {

    user: mongoose.Types.ObjectId;

    @IsString()
    @MinLength(3)
    subject: String;

    @IsString()
    @MinLength(5)
    body: String;

    department: mongoose.Types.ObjectId;

    status: TicketStatus

    hasAnswer: Boolean
    
    isItAnswer: Boolean
}
