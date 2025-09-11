import mongoose from "mongoose";

const wishlistSchame = new mongoose.Schema({

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

})

const Wishlist = mongoose.models.Wishlist || mongoose.model('Wishlist', wishlistSchame)

export default Wishlist