import mongoose from "mongoose";
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

    hasAnswer: {
        type: Boolean,
        default: false
    },
    
    isItAnswer: {
        type: Boolean,
        default: false
    },

    mainTicket: {
        type: mongoose.Types.ObjectId,
        ref: 'Ticket'
    }
})


const Ticket = mongoose.models.Ticket || mongoose.model('Ticket', ticketSchema)

export default Ticket