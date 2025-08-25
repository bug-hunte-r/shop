import mongoose from "mongoose";

export class CreateUserDto {

    id: mongoose.Types.ObjectId

    username: string

    mobile: number

    password: string

    role: string
}
