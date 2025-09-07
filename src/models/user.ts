import mongoose from "mongoose";
import Address from "./address";
import Comment from "./comment";

const userSchema = new mongoose.Schema({

    username: {
        type: String,
        required: true
    },

    mobile: {
        type: Number,
        required: true
    },

    password: {
        type: String,
        required: true
    },

    role: {
        type: String,
        required: true
    }

})

userSchema.virtual('comments', {
    ref: 'Comment',
    localField: '_id',
    foreignField: 'user'
});

userSchema.set('toObject', { virtuals: true });
userSchema.set('toJSON', { virtuals: true });

userSchema.virtual('addreses', {
    ref: 'Address',
    localField: '_id',
    foreignField: 'user'
});

userSchema.set('toObject', { virtuals: true });
userSchema.set('toJSON', { virtuals: true });

const User = mongoose.models.User || mongoose.model('User', userSchema)

export default User