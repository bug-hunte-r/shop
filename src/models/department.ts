import mongoose from "mongoose";

const departmentSchema = new mongoose.Schema({
    subject: {
        required: true,
        type: String
    },
})


const Department = mongoose.models.Department || mongoose.model('Department', departmentSchema)

export default Department