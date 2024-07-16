import mongoose from 'mongoose'


export const loginSchema = mongoose.Schema({
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        trim:true
    },
    auth: {
        type: String,
        require: true,
        default: "user"
    }
}, { timestamps: true })


const model = mongoose.model("login", loginSchema)

export default model 