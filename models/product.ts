import mongoose from "mongoose";
import Category from "./category";

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

const Product = mongoose.models.Product || mongoose.model('Product', productSchema)

export default Product