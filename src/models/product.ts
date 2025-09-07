import mongoose from "mongoose";
import Category from "./category";
import Comment from "./comment";

const productSchema = new mongoose.Schema({

    title: {
        required: true,
        type: String
    },
    price: {
        required: true,
        type: Number
    },
    category: {
        required: true,
        type: mongoose.Types.ObjectId,
        ref: 'Category'
    }
})

productSchema.virtual('comments', {
    ref: 'Comment',
    localField: '_id',
    foreignField: 'product'
})

productSchema.set('toObject', { virtuals: true });
productSchema.set('toJSON', { virtuals: true });

const Product = mongoose.models.Product || mongoose.model('Product', productSchema)

export default Product