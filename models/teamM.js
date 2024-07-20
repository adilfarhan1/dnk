import mongoose from "mongoose";

const teamSchema = mongoose.Schema({
    user_id: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true,
        trim: true
    },
    name: {
        type: String,
        required: true
    },
    position: {
        type: String,
        required: true
    },
    experience: {
        type: String,
    },
    specialization: {
        type: String,
    },
    language: {
        type: String,
    },
    email: {
        type: String,
    },
    phone: {
        type: String,
    },
    whatsapp: {
        type: String,
    },
    about: {
        type: String,
    }
});

const model = mongoose.model("team", teamSchema)

export default model