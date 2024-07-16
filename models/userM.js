import mongoose from 'mongoose'

const userSchema = mongoose.Schema({
    password: {
        type: String,
        require: true,
        trim: true
    },
    email: {
        type: String,
        require: true,
        // unique: true,
        trim:true
    },
    image: {
        type: String,
        trim: true
    },
    phone: {
        type: Number,
    }
})

const model = mongoose.model("user", userSchema)

export default model