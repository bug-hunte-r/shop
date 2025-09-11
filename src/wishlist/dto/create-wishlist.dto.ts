import mongoose from "mongoose";

export class CreateWishlistDto {

    user: mongoose.Types.ObjectId;

    product: mongoose.Types.ObjectId;
}
