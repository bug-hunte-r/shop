import mongoose from "mongoose";

const cartSchema = new mongoose.Schema({

    user: {
        required: true,
        type: mongoose.Types.ObjectId,
        ref: 'User'
    },

    product: {
        required: true,
        type: mongoose.Types.ObjectId,
        ref: 'Product'
    },

    count: {
        required: true,
        type: Number
    }
})

const Cart = mongoose.models.Cart || mongoose.model('Cart', cartSchema)

export default Cart