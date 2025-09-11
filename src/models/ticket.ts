import mongoose from "mongoose";

const ticketSchame = new mongoose.Schema({

    user: {
        type: mongoose.Types.ObjectId,
        required: true
    },

    subject: {
        type: String,
        required: true
    },

    body: {
        type: String,
        required: true
    },

    department: {
        type: mongoose.Types.ObjectId,
        required: true
    },

    sender: {
        type: String,
        required: true
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
    }
})

const Ticket = mongoose.models.Ticket || mongoose.model('Ticket', ticketSchame)

export default Ticket