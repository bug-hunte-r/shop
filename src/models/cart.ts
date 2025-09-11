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
        type: Number,
        default: 1
    }
})

cartSchema.index({ user: 1, product: 1 }, { unique: true });

const Cart = mongoose.models.Cart || mongoose.model('Cart', cartSchema)

export default Cart