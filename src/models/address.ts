import mongoose from "mongoose";

const addressSchema = new mongoose.Schema({

    province: {
        type: String,
        required: true
    },

    city: {
        type: String,
        required: true
    },

    neighborhood: {
        type: String,
        required: true
    },

    street: {
        type: String,
        required: true
    },

    user: {
        required: true,
        ref: 'User',
        type: mongoose.Types.ObjectId
    }

})

const Address = mongoose.models.Address || mongoose.model('Address', addressSchema)

export default Address