import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({

    title: {
        required: true,
        type: String
    }
})

const Category = mongoose.models.Category || mongoose.model('Category', categorySchema)

export default Category