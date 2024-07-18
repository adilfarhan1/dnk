import { v4 as uuid } from 'uuid'
import fs from 'fs'
// import multer from 'multer'

// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         cb(null, 'u')
//     }
// })

export const fileUpload = async (name, image) => {
    return new Promise( async (resolve,reject) =>{
        let state = await image.mv(`${process.cwd()}/image/${name}`)
        .then((data) => resolve(true))
        .catch(err => reject(false))
    })
}

export const randomKey = () => {
    return uuid()
}

export const fileDelete = async (name) => {
    try {
        const state = await fs.
            existsSync(`${process.cwd()}/image/${name}`)
        if (state) {
            fs.unlinkSync(`${process.cwd()}/image/${name}`)
        }
        return true
    } catch (err) {
        console.log(err)
        return false
    }
}