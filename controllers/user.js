import userModel from '../models/userM.js'
import loginModel from '../models/loginM.js'
import { mailSend, generatePass } from '../utils/email.js'
import { createError } from '../utils/error.js'
import bcrypt from 'bcrypt'
// import { fileDelete, fileUpload, randomKey } from '../utils/fileUploader.js'



export const createUser = async (req, res, next) => {
    let imgName
    try {
        let pass
        // if (req?.files?.image) {
        //     imgName = randomKey() + req?.files?.image?.name
        //     profileSave = await fileUpload(imgName, req.files.image)
        //     if (!profileSave) return next(createError(400, "Filied to upload profile please try agin"))
        // }
        if (req.body.password) {
            const salt = bcrypt.genSaltSync(10)
            pass = bcrypt.hashSync(req.body.password, salt)
        }
        const user = userModel({
            ...req.body,
            password: pass,
            image: imgName,

        })
        const login = loginModel({
            _id: user.id,
            email: user.email,
            password: user.password
        })

        await login.save()
        await user.save()
        res.status(200).json({ sucess: true, message: "sucessfully" })
    } catch (err) {
        next(createError(400, err.message))
    }

}



// export const updateUser = async (req, res, next) => {
//     let imgName, userUpdated
//     try {
//         let profileSave, pass
//         if (req?.files?.image) {
//             imgName = randomKey() + req?.files?.image?.name
//             profileSave = await fileUpload(imgName, req.files.image)
//             if (!profileSave) return next(createError(400,
//                 "Filied to upload profile please try agin"))
//         }

//         if (req.body.password) {
//             const salt = bcrypt.genSaltSync(10)
//             pass = bcrypt.hashSync(req.body.password, salt)
//             req.body.password = pass
//         }
//         userUpdated = await userModel.
//             findByIdAndUpdate(req.user.id,
//                 {
//                     $set: { ...req.body, image: imgName }
//                 }, { new: false })
        
//         if (profileSave)
//             await fileDelete(userUpdated?.image);
        
//         await loginModel.findByIdAndUpdate(req.user.id,
//             {
//                 $set: { ...req.body }
//             }, { new: true })


//         res.status(200).json({ sucess: true, message: 'User upadated' })
//     } catch (err) {
//         if (userUpdated)
//             await userModel.findByIdAndUpdate(req.user.id,
//                 {
//                     $set: { ...userUpdated }
//                 })
//         next(createError(400, err.message))
//     }
// }

// export const deleteUser = async (req, res, next) => {
//     try {
//         const userDeleted = await userModel.findByIdAndDelete(req.params.id);
//         console.log(userDeleted)
//         res.status(200).json({ sucess: true, message: "Deleted user successfully" })
//     } catch (err) {
//         next(createError(400, err.message))
//     }
// }

// export const getUser = async (req, res, next) => {
//     try {
//         const userGet = await userModel.findById(req.user.id)

//         const {password, ...others } = userGet._doc
//             res.status(200).json({ sucess: true, message: "user data get", data: others })
//     } catch (err) {
//         next(createError(400, err.message))
//     }
// }

// export const forgotPass = async (req, res, next) => {
//     try {
//         const checkUser = await userModel.findOne({ email: req.body.email })
//         if (!checkUser)
//             return next(createError(400, 'Failed to send email , Please try again'))
//         const pass = generatePass(3)
//         const salt = bcrypt.genSaltSync(10);
//         let pass2 = bcrypt.hashSync(pass, salt);
//         const subject = "Forgot password"
//         // const text = "Your password has been successfully changed to" + pass
//         const message = `Your password for email ${req.body.email} as been changed to ${pass}`
//         const mailCheck = await mailSend(req.body.email, subject, message)
//         console.log(mailCheck)
//         if (!mailCheck)
//             return next(createError(400, "Failed to send email, Please try again"))
//         await userModel.findByIdAndUpdate(checkUser._id, {
//             $set: { password: pass2 }
//         }, { new: true })
//         await loginModel.findByIdAndUpdate(checkUser._id, {
//             $set: { password: pass2 }
//         }, { new: true })
//         res.status(200).json({ success: true, message: "Password changed sucessfully and send" })

//     } catch (err) {
//         next(createError(400, err.message))
//     }
// }


