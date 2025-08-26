import mongoose from "mongoose";
import Product from "./product";

const categorySchema = new mongoose.Schema({

    title: {
        required: true,
        type: String
    }
})


categorySchema.virtual('product', {
    ref: 'Product',
    localField: '_id',
    foreignField: 'category'
});

categorySchema.set('toObject', { virtuals: true });
categorySchema.set('toJSON', { virtuals: true });

const Category = mongoose.models.Category || mongoose.model('Category', categorySchema)

export default Category