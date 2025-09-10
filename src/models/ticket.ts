import mongoose from "mongoose";
import { TicketStatus } from "src/enum/ticketEnum";
import Department from "./department";

const ticketSchema = new mongoose.Schema({

    user: {
        required: true,
        type: mongoose.Types.ObjectId
    },

    subject: {
        required: true,
        type: String
    },

    body: {
        required: true,
        type: String
    },

    department: {
        required: true,
        type: mongoose.Types.ObjectId,
        ref: 'Department'
    },

    status: {
        required: true,
        type: Object.values(TicketStatus),
        default: TicketStatus.Open
    },

    hasAnswer: {
        type: Boolean,
        default: false
    },
    
    isItAnswer: {
        type: Boolean,
        default: false
    }
})


const Ticket = mongoose.models.Ticket || mongoose.model('Ticket', ticketSchema)

export default Ticket