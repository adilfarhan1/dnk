import mongoose from 'mongoose'

const taskSchema = mongoose.Schema({
    user_id: {
        type: String,
        required: true
    },
    projectname: {
        type: String,
        required: true
    },
    image: {
        type: String,
        trim: true
    },
    developer: {
        type: String,
        required:true,
    }
    ,
    type: {
        type:String
    },
    bedroom: {
        type: String
    },
    handover: {
        type: String
    },
    totalarea: {
        type: String
    },
    dld: {
        type: String,
        trim: true
    },
    coverimage: {
        type: String,
        trim: true
    },
    bannertitile: {
        type: String,
        
    },
    bannersubtitile: {
        type: String,
        
    },
    gallary1: {
        type: String,
        trim: true
    },
    gallary2: {
        type: String,
        trim: true
    },
    gallary3: {
        type: String,
        trim: true
    },
    mainhead: {
        type: String,
    },
    about: {
        type: String,
    },
    location: {
        type: String,
        trim: true
    },
    nearby1: {
        type: String,
    },
    dec1: {
        type: String,
    },
    nearby2: {
        type: String,
    },
    dec2: {
        type: String,
    },
    nearby3: {
        type: String,
    },
    dec3: {
        type: String,
    },
    nearby4: {
        type: String,
    },
    dec4: {
        type: String,
    },
    // status: {
    //     type: String,
    //     required: true,
    // },
    
})

const model = mongoose.model("task", taskSchema)

export default model