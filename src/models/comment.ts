import mongoose from "mongoose";
import User from "./user";
import Product from "./product";

const commentSchema = new mongoose.Schema({

    body: {
        required: true,
        type: String
    },

    user: {
        required: true,
        type: mongoose.Types.ObjectId,
        ref: 'User'
    },

    product: {
        required: true,
        type: mongoose.Types.ObjectId,
        ref: 'Product'
    }

}, { timestamps: true })

const Comment = mongoose.models.Comment || mongoose.model('Comment', commentSchema)

export default Comment