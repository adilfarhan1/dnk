import loginModel from '../models/loginM.js'
import bcrypt from 'bcrypt'
import { encrypt } from '../utils/crypto.js'
import { createError } from '../utils/error.js'


export const login = async (req, res, next) => {
    try {
        const checkEmail = await loginModel.findOne({ email: req.body.email })
        if (!checkEmail)
            return next(createError(400, 'Email is invalid please connect with office admin'))
        const checkPass = await bcrypt.compareSync(req.body.password, checkEmail.password)
        if (!checkPass)
            return next(createError(400, 'Your password is incorrect'))
        const text = JSON.stringify({ id: checkEmail._id })
        const token = await encrypt(text)
        
        res.cookie("token", token, { httpOnly: true }).status(200).json({sucess:true, message:'You are logged in'})
    } catch (err) {
        // console.log(err.message)
        next(createError(500, err.message))
    }
}

export const logout = async (req, res, next) => {
    try {
        if (req.cookies?.token)
            res.clearCookie("token").status(200).json('You are logged out')
        else
            res.status(200).json({success:true,message:"you are already logged out"})
        
    } catch (err) {
        next(createError(400, err.message))
    }
}