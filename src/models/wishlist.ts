import mongoose from "mongoose";

const wishlistSchema = new mongoose.Schema({

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

wishlistSchema.index({ user: 1, product: 1 }, { unique: true });

const Wishlist = mongoose.models.Wishlist || mongoose.model('Wishlist', wishlistSchema)

export default Wishlist