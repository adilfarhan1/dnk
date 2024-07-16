import mongoose, { model } from "mongoose";

const tokenSchema = mongoose.Schema({
    user_id: {
        type: String,
        require : true,
    },
    token: {
        type: String,
        require: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
        expires: 3600
    },
})

export default model